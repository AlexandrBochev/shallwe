import { BellIcon, HomeIcon, UserIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SignInButton, UserButton } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import ModeToggle from "../ModeToggle/ModeToggle"
import { MAIN_LAYOUT } from "@/lib/constants"

const DesktopNavbar = async () => {
  const user = await currentUser();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ModeToggle />

      <Button variant="ghost" className="flex items-center gap-2" asChild>
        <Link href={MAIN_LAYOUT.NAVBAR.home.href}>
          <HomeIcon className="w-4 h-4" />
          <span className="hidden lg:inline">
            {MAIN_LAYOUT.NAVBAR.home.name}
          </span>
        </Link>
      </Button>

      {user ? (
        <>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link href={MAIN_LAYOUT.NAVBAR.notifications.href}>
              <BellIcon className="w-4 h-4" />
              <span className="hidden lg:inline">
                {MAIN_LAYOUT.NAVBAR.notifications.name}
              </span>
            </Link>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2" asChild>
            <Link
              href={`${MAIN_LAYOUT.NAVBAR.profile.href}/${
                user.username ??
                user.emailAddresses[0].emailAddress.split("@")[0]
              }`}
            >
              <UserIcon className="w-4 h-4" />
              <span className="hidden lg:inline">
                {MAIN_LAYOUT.NAVBAR.profile.name}
              </span>
            </Link>
          </Button>
          <div className="flex items-center border-2 border-border rounded-full">
            <UserButton />
          </div>
        </>
      ) : (
        <SignInButton mode="modal">
          <Button variant="default">{MAIN_LAYOUT.NAVBAR.signIn}</Button>
        </SignInButton>
      )}
    </div>
  );
}
export { DesktopNavbar };
