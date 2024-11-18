import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
});

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .min(1, "Title is required")
    .max(500, "Description is too long"),
  duration: z.number().int().positive("Duration must be positive"),
  isPrivate: z.boolean(),
});

export type EventSchemaType = z.infer<typeof eventSchema>;

export const daySchema = z
  .object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAvailable) {
        return (
          data.startTime !== undefined &&
          data.endTime !== undefined &&
          data.startTime < data.endTime
        );
      }
      return true;
    },
    {
      message: "End time must be greater than start time",
      path: ["endTime"],
    }
  );

export type daySchemaType = z.infer<typeof daySchema>;
export const availabilitySchema = z.object({
  timeGap: z
    .number()
    .int()
    .positive("Time gap must be positive")
    .min(0, "Time gap must be greater than 0"),
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
});

export type AvailabilitySchemaType = z.infer<typeof availabilitySchema>;

export const example = z.object({
  day: z.string(),
});
