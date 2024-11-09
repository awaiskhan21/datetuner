import { clerkClient, currentUser } from "@clerk/nextjs/server";
import prisma from "./db";

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  try {
    const loggedInUser = await prisma.user.findUnique({
      where: {
        clerkUserId: user?.id,
      },
    });
    if (loggedInUser) {
      return loggedInUser;
    }
    const name = `${user.firstName} ${user.lastName}`;
    await clerkClient.users.updateUser(user.id, {
      username: name.split(" ").join("-") + user.id.slice(-4),
    });

    const newUser = await prisma.user.create({
      data: {
        name,
        clerkUserId: user.id,
        username: name.split(" ").join("-") + user.id.slice(-4),
        email: user.emailAddresses[0].emailAddress,
        imageUrl: user.imageUrl,
      },
    });
  } catch {}
};
