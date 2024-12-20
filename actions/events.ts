"use server";
import prisma from "@/lib/db";
import { eventSchema, EventSchemaType } from "@/lib/validators";
import { auth } from "@clerk/nextjs/server";

export async function createEvent(data: EventSchemaType) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be logged in to create an event");
  }

  const validatedData = eventSchema.parse(data);

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const event = await prisma.events.create({
    data: {
      ...validatedData,
      userId: user?.id,
    },
  });

  return event;
}

export async function getUserEvents() {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be logged in to create an event");
  }
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const events = await prisma.events.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
  return { events, username: user.username };
}

export async function deleteEvent(eventId: string) {
  const { userId } = auth();
  if (!userId) {
    throw new Error("You must be logged in to create an event");
  }
  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const event = await prisma.events.findUnique({
    where: { id: eventId, userId: user.id },
  });
  if (!event) {
    throw new Error("Event not found");
  }
  await prisma.events.delete({
    where: { id: eventId, userId: user.id },
  });
  return { success: true };
}

export async function getEventDetails(eventId: string, username: string) {
  const event = await prisma.events.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          imageUrl: true,
          email: true,
        },
      },
    },
  });
  return event;
}
