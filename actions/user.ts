"use server";

import prisma from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const updateUsername = async (username: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("User not found");

  const existingUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (existingUser && existingUser.clerkUserId !== userId) {
    throw new Error("Username already taken");
  }

  await prisma.user.update({
    where: { clerkUserId: userId },
    data: { username },
  });

  await clerkClient.users.updateUser(userId, { username });
  return { success: true };
};
