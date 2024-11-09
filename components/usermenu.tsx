"use client";
import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";

function Usermenu() {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
        },
      }}
    >
      <UserButton.MenuItems>
        {/* to change the order of icons */}
        {/* <UserButton.Action label="manageAccount" /> */}
        <UserButton.Link
          label="My Event"
          labelIcon={<ChartNoAxesGantt size={15} />}
          href="/events"
        />
      </UserButton.MenuItems>
    </UserButton>
  );
}
export default Usermenu;
