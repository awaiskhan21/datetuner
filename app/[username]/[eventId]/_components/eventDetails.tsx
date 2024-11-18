import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EventDetailType } from "@/lib/types";
import { Calendar, Clock } from "lucide-react";

const EventDetails = ({ event }: { event: EventDetailType | null }) => {
  if (!event) {
    return <div>No event details available</div>;
  }

  return (
    <div className="p-10 lg:w-1/3 bg-white">
      <h1 className="text-3xl font-bold mb-4">{event.title} </h1>
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <AvatarImage
            src={event?.user.imageUrl ?? "https://github.com/shadcn.png"}
          />
          <AvatarFallback className="text-6xl font-bold ">
            {event?.user.name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{event.user.name} </h2>
          <p className="text-gray-600">{event.user.email} </p>
        </div>
      </div>
      <div className="flex mb-2 items-center gap-2">
        <Clock />
        <span> minutes</span>
      </div>
      <div className="flex mb-2 gap-2">
        <Calendar />
        <span>Google meet</span>
      </div>
      <p className="text-gray-600 mt-4">{event.description}</p>
    </div>
  );
};
export default EventDetails;
