"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EventType } from "@/lib/types";
import { Link, Trash2 } from "lucide-react";
import { useState } from "react";
import { setTimeout } from "timers";
import { Button } from "./ui/button";

function EventCard({
  event,
  username,
}: {
  event: EventType;
  username: string;
}) {
  const [isCopied, setIsCopied] = useState(false);
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

  return (
    <Card className="flex flex-col justify-between cursor-pointer">
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
      <CardFooter className="flex gap-4">
        <Button
          variant="outline"
          className="flex items-center"
          onClick={handleCopy}
        >
          <Link className="h-4 w-4 mr-2" /> {isCopied ? "Copied" : "Copy Link"}
        </Button>
        <Button variant="destructive">
          <Trash2 className="h-4 w-4 mr-2" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
export default EventCard;
