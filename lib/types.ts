export type EventType = {
  id: string;
  title: string;
  description: string | null;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean;
  userId: string;
};

export type AvailabilityDataType = {
  timeGap: number;
  [key: string]:
    | {
        isAvailable: boolean;
        startTime: string;
        endTime: string;
      }
    | number;
};
export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";
