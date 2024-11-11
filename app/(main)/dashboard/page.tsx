"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usernameSchema } from "@/lib/validators";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function Dashboard() {
  const { user, isLoaded } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });
  useEffect(() => {
    setValue("username", user?.username);
  }, [isLoaded]);
  const onSubmit = async () => {};
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.fullName}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique Link</CardTitle>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mt-6 mb-2">
                  <span className="flex-shrink-0">
                    {window?.location.origin}
                  </span>
                  <Input {...register("username")} placeholder="username" />
                </div>
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {typeof errors.username.message === "string"
                    ? errors.username.message
                    : "error"}{" "}
                </p>
              )}
              <Button type="submit">Update Username</Button>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
export default Dashboard;
