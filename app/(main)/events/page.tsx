import { getUserEvents } from "@/actions/events";
import EventCard from "@/components/eventCard";
import { Suspense } from "react";

function EventPage() {
  return (
    <Suspense fallback={<div>Loading Events....</div>}>
      <Event />
    </Suspense>
  );
}

const Event = async () => {
  const { events, username } = await getUserEvents();
  if (events.length === 0) {
    return <p>You haven&apos;t created any events yet.</p>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {events.map((event) => {
        return <EventCard key={event.id} event={event} username={username} />;
      })}
    </div>
  );
};
export default EventPage;
