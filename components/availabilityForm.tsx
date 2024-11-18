"use client";

import { updateUserAvailability } from "@/actions/availability";
import useFetch from "@/hooks/useFetch";
import { timeSlots } from "@/lib/data";
import { Day } from "@/lib/types";
import {
  availabilitySchema,
  AvailabilitySchemaType,
  daySchemaType,
} from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function AvailabilityForm({
  initialData,
}: {
  initialData: {
    availabilityData: { [key: string]: daySchemaType };
    timeGap: number;
  };
}) {
  const flattenData: { [key: string]: daySchemaType } = {
    ...initialData.availabilityData,
  };
  const timeGap = initialData.timeGap;
  // console.log("initialData", initialData);
  // console.log("flattenData", flattenData);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AvailabilitySchemaType>({
    resolver: zodResolver(availabilitySchema),
    defaultValues: { ...flattenData, timeGap },
  });

  const {
    loading,
    error,
    fn: fnupdateAvailability,
  } = useFetch(updateUserAvailability);

  const onSubmit = async (data: any) => {
    console.log("data", data);
    await fnupdateAvailability(data);
    // alert("hii");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {[
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ].map((day) => {
        const val = day as Day;
        const isAvailable = watch(`${val}.isAvailable`);

        return (
          <div key={day} className="flex items-center space-x-4 mb-4">
            <Controller
              name={`${day as Day}.isAvailable`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    setValue(`${val}.isAvailable`, checked as boolean);
                    if (!checked) {
                      setValue(`${val}.startTime`, "09:00");
                      setValue(`${val}.endTime`, "17:00");
                    }
                  }}
                />
              )}
            />
            <span className="w-24">
              {day.charAt(0).toUpperCase() + day.slice(1)}
            </span>
            {isAvailable && (
              <>
                <Controller
                  name={`${val}.startTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Start Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <span>to</span>
                <Controller
                  name={`${val}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="End Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors[val]?.endTime && (
                  <span className="text-red-500 text-sm ml-2">
                    {errors[val].endTime.message}
                  </span>
                )}
              </>
            )}
          </div>
        );
      })}

      <div className="flex items-center space-x-4">
        <span className="w-48">Minimum gap before booking (minutes):</span>

        <Input
          type="number"
          {...register("timeGap", {
            valueAsNumber: true,
          })}
          className="w-32"
        />

        {errors.timeGap && (
          <span className="text-red-500 text-sm">{errors.timeGap.message}</span>
        )}
      </div>
      {error && <div className="text-red-500 text-sm">{error?.message}</div>}
      <Button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Availability"}
      </Button>
    </form>
  );
}
