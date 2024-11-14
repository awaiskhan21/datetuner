"use client";
import { updateUsername } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useFetch from "@/hooks/useFetch";
import { usernameSchema } from "@/lib/validators";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BarLoader } from "react-spinners";

function Dashboard() {
  const { user, isLoaded } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{
    username: string;
  }>({
    resolver: zodResolver(usernameSchema),
  });

  const { loading, error, fn: updateUsernameFn } = useFetch(updateUsername);

  useEffect(() => {
    setValue("username", user?.username as string);
  }, [isLoaded]);

  // this is the function that will be called when the form for update username is submitted
  const onSubmit = async (data: { username: string }) => {
    await updateUsernameFn(data.username);
  };

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

                {/* this for form */}
                {errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {typeof errors.username.message === "string"
                      ? errors.username.message
                      : "error"}{" "}
                  </p>
                )}
                {/* this one is for api call */}
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error?.message} </p>
                )}
              </div>
              {loading && (
                <BarLoader className="mb-4" color="#2563EB" width={"100%"} />
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
