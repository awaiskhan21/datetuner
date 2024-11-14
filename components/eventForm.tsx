"use client";
import { createEvent } from "@/actions/events";
import useFetch from "@/hooks/useFetch";
import { eventSchema, EventSchemaType } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const EventForm = ({ onSubmitForm }: { onSubmitForm: () => void }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<EventSchemaType>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: false,
    },
  });

  const {
    data,
    error,
    loading,
    fn: createEventFunction,
  } = useFetch(createEvent);

  const onSubmintHandler = (data: EventSchemaType) => {
    createEventFunction(data);
    if (!loading && !error) onSubmitForm();
    router.refresh();
  };
  return (
    <form
      className="px-5 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmintHandler)}
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Event Title
        </label>
        <Input id="title" {...register("title")} placeholder="Title" />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Event Description
          <Input
            id="description"
            {...register("description")}
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </label>
      </div>

      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-gray-700"
        >
          Event Duration (in minutes)
        </label>
        <Input
          id="duration"
          {...register("duration", { valueAsNumber: true })}
          type="number"
          placeholder="Duration"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="isPrivate"
          className="block text-sm font-medium text-gray-700"
        >
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => {
            return (
              <Select
                value={field.value ? "true" : "false"}
                onValueChange={(value) => field.onChange(value === "true")}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Event Privacy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Private</SelectItem>
                  <SelectItem value="false">Public</SelectItem>
                </SelectContent>
              </Select>
            );
          }}
        />
        {errors.isPrivate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.isPrivate.message}
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error.message} </p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Creating Event..." : "Create Event"}
      </Button>
    </form>
  );
};
export default EventForm;
