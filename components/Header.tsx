import { getServerSession } from "next-auth";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import UserButton from "./UserButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Button } from "./ui/button";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";

async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-800">
      <nav className="flex flex-col sm:flex-row items-center justify-between p-2 px-2 bg-white dark:bg-slate-600 max-w-7xl mx-auto">
        <Logo />

        <div className="flex gap-2 mt-3 sm:mt-0">
          {session ? (
            <>
              <Button
                variant="ghost"
                className="px-0 rounded-full dark:hover:bg-slate-900">
                <Link 
                  href={"/chat"}
                  prefetch={false}
                  className="flex justify-center items-center rounded-full w-10 h-10">
                    <MessagesSquareIcon/>
                </Link>
              </Button>
              <CreateChatButton/>
            </>
          ) : (
            <>
            <Link 
              href={"/pricing"}
              className="flex justify-center items-center rounded-full">
                Pricing
            </Link>
            </>
          )}

          <ThemeToggle />
          <UserButton session={session}/>
        </div>
      </nav>
      {/* {Upgrade banner} */}
    </header>
  );
}

export default Header;
