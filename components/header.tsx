import { checkUser } from "@/lib/checkUser";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { PenBox } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import UserMenu from "./usermenu";

async function Header() {
  await checkUser();
  return (
    <nav className="flex justify-between mx-auto py-2 px-2 items-center shadow-md boarder-b-2">
      <Link href={"/"}>
        <div className="font-bold text-2xl h-16 w-auto flex flex-col justify-center bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          {" "}
          Date tuner
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="/events?create=true">
          <Button className="flex items-center gap-2">
            <PenBox size={18} />
            Create Event
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant={"outline"}>Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserMenu />
        </SignedIn>
      </div>
    </nav>
  );
}

export default Header;
