"use server";
import prisma from "@/lib/db";
import { AvailabilitySchemaType, daySchemaType } from "@/lib/validators";
import { auth } from "@clerk/nextjs/server";
import { DayOfWeek } from "@prisma/client";

export const getUserAvailability = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      availability: {
        include: {
          days: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  const availabilityData: { [key: string]: daySchemaType } = {
    monday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    tuesday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    wednesday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    thursday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    friday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    saturday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
    sunday: { isAvailable: false, startTime: "09:00", endTime: "17:00" },
  };

  [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ].forEach((day) => {
    const key = day as keyof AvailabilitySchemaType; // Ensures the key matches the schema

    const dayAvailability = user.availability?.days.find(
      (d) => d.day === day.toUpperCase()
    );

    availabilityData[key] = {
      isAvailable: !!dayAvailability,
      startTime: dayAvailability
        ? dayAvailability.startTime.toISOString().slice(11, 16)
        : "09:00",
      endTime: dayAvailability
        ? dayAvailability.endTime.toISOString().slice(11, 16)
        : "17:00",
    };
  });

  return {
    availabilityData,
    timeGap: user.availability === null ? 0 : user.availability.timeGap,
  };
};

export const updateUserAvailability = async (data: AvailabilitySchemaType) => {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      availability: true,
    },
  });

  if (!user) throw new Error("User not found");

  const availabilityData = Object.entries(data).flatMap(
    ([day, { isAvailable, startTime, endTime }]: any) => {
      //it will only return array where isAvailable is true
      //   [{
      //     day: 'MONDAY',
      //     startTime: 2024-11-18T09:00:00.000Z,
      //     endTime: 2024-11-18T17:00:00.000Z
      //   }]
      if (isAvailable) {
        const baseDate = new Date().toISOString().split("T")[0]; //"2024-11-18"

        return [
          {
            day: day.toUpperCase() as DayOfWeek,
            startTime: new Date(`${baseDate}T${startTime}:00Z`), //utc time
            endTime: new Date(`${baseDate}T${endTime}:00Z`),
          },
        ];
      }
      return [];
    }
  );

  if (user.availability) {
    await prisma.availability.update({
      where: { id: user.availability.id },
      data: {
        timeGap: data.timeGap,
        days: {
          deleteMany: {},
          create: availabilityData,
        },
      },
    });
  } else {
    await prisma.availability.create({
      data: {
        userId: user.id,
        timeGap: data.timeGap,
        days: { create: availabilityData },
      },
    });
  }
  // console.log(data);
  // console.log(availabilityData);
};
