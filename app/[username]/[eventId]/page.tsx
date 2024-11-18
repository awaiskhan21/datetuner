import { getEventDetails } from "@/actions/events";
import { notFound } from "next/navigation";
import EventDetails from "./_components/eventDetails";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string; username: string }>;
}) {
  const eventId = (await params).eventId;
  const username = (await params).username;
  const event = await getEventDetails(eventId, username);
  if (!event) {
    return {
      title: `Event Not Found`,
    };
  }
  return {
    title: `DateTuner | Book ${event.title} with ${event.user.name}`,
    description: `Schedule a ${event.duration}-min ${event.title} event with ${event.user.name}`,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string; username: string }>;
}) {
  const eventId = (await params).eventId;
  const username = (await params).username;
  const event = await getEventDetails(eventId, username);
  if (!event) {
    notFound;
  }
  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
      <EventDetails event={event} />
    </div>
  );
}
