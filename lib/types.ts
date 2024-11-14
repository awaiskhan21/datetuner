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
