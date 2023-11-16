import { getServerSession } from "next-auth";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import UserButton from "./UserButton";
import { authOptions } from "@/authOptions";
import { Button } from "./ui/button";
import Link from "next/link";
import { MessagesSquareIcon } from "lucide-react";
import CreateChatButton from "./CreateChatButton";
import UpgradeBanner from "./UpgradeBanner";
import LanguageSelector from "./LanguageSelector";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-oasis-100 dark:bg-tiber-950">
      <nav className="flex flex-col sm:flex-row items-center justify-between p-2 px-2 bg-oasis-100 dark:bg-tiber-950 max-w-6xl mx-auto">
        <Logo />

        <div className="flex gap-2 mt-3 sm:mt-0">
          <LanguageSelector />

          {session ? (
            <>
              <Link
                href={"/chat"}
                prefetch={false}>
                <Button
                  variant="ghost"
                  className="px-0 rounded-full w-10 h-10 hover:scale-110 mx-1">
                  <MessagesSquareIcon />
                  </Button>
                </Link>
              <CreateChatButton />
            </>
          ) : (
            <>
              <Link
                href={"/pricing"}
                className="flex justify-center items-center rounded-full hover:scale-110 mx-1">
                Pricing
              </Link>
            </>
          )}

          <ThemeToggle />
          
          <UserButton session={session} />
        </div>
      </nav>
      <UpgradeBanner/>
    </header>
  );
}

export default Header;
