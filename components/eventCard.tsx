"use client";
import { deleteEvent } from "@/actions/events";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useFetch from "@/hooks/useFetch";
import { EventType } from "@/lib/types";
import { Link, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setTimeout } from "timers";
import { Button } from "./ui/button";

function EventCard({
  event,
  username,
  isPublic = false,
}: {
  event: EventType;
  username: string;
  isPublic: boolean;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.log("Error copying link: ", error);
    }
  };

  const { loading, fn: deleteEventFunctin } = useFetch(deleteEvent);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      deleteEventFunctin(event.id);
      router.refresh();
    }
  };
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLElement).tagName !== "BUTTON") {
      window.open(
        `${window.location.origin}/${username}/${event.id}`,
        "_blank"
      );
    }
  };
  return (
    <Card
      className="flex flex-col justify-between cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader>
        <CardTitle>{event.title} </CardTitle>
        <CardDescription>
          <span>
            {event.duration} mins | {event.isPrivate ? "Private" : "Public"}{" "}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{event.description}</p>
      </CardContent>
      {!isPublic && (
        <CardFooter className="flex gap-4">
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleCopy}
          >
            <Link className="h-4 w-4 mr-2" />{" "}
            {isCopied ? "Copied" : "Copy Link"}
          </Button>
          <Button
            variant="destructive"
            disabled={loading}
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {loading ? "Deleting..." : "Delete Event"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
export default EventCard;
