import { getUserByUsername } from "@/actions/user";
import EventCard from "@/components/eventCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return {
    title: `DateTuner | ${(await params).username}`,
    description: `DateTuner is a scheduling app that allows you to book a call with your friends and family. It's a great way to stay connected and make new memories.`,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const username = (await params).username;
  const user = await getUserByUsername(username);
  // console.log(user);
  if (!user) {
    notFound;
  }
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex flex-col justify-center items-center">
        <Avatar className="w-36 h-36 mb-4">
          <AvatarImage
            src={user?.imageUrl ?? "https://github.com/shadcn.png"}
          />
          <AvatarFallback className="text-6xl font-bold ">
            {user?.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">
          {user?.name?.includes("null")
            ? user?.name?.split(" ")[0]
            : user?.name}{" "}
        </h1>
        <p className="text-gray-600 text-center font-semibold text-xl">
          {" "}
          Welcome to my scheduling page. Please select and event below to book a
          call with me.
        </p>
      </div>

      {user?.events.length === 0 ? (
        <p className="text-center text-gray-600 mt-8 text-lg">
          No public events available.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg lg:grid-cols-3 gap-6 mt-8">
          {user?.events.map((event) => {
            return (
              <EventCard
                key={event.id}
                event={event}
                username={username}
                isPublic={true}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
