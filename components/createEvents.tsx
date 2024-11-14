"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventForm from "./eventForm";

export default function createEvent() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = useSearchParams().get("create");
  const router = useRouter();
  function handleCancel() {
    setIsOpen(false);
    if (pathname === "true") {
      router.replace(`${window.location.pathname}`);
    }
  }
  console.log(pathname);
  useEffect(() => {
    if (pathname === "true") setIsOpen(true);
  }, [pathname]);
  return (
    <Drawer open={isOpen}>
      {/* <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger> */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create New Event</DrawerTitle>
        </DrawerHeader>
        <EventForm
          onSubmitForm={() => {
            handleCancel();
          }}
        />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
