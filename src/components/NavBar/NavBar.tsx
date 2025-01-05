import Link from "next/link"
import { MAIN_LAYOUT } from "@/lib/constants"
import { DesktopNavbar } from "../DesktopNavbar/DesktopNavbar"
import { MobileNavbar } from "../MobileNavbar/MobileNavbar"
import { currentUser } from "@clerk/nextjs/server"
import { syncUser } from "@/actions/user.action"

export const dynamic = "force-dynamic"

const NavBar = async () => {
  const user = await currentUser()
  if (user) await syncUser()
  const username = user?.username ?? user?.emailAddresses[0].emailAddress.split("@")[0]

  return (
    <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-semibold text-primary tracking-wider"
            >
              &#129335; {MAIN_LAYOUT.METADATA.title}
            </Link>
          </div>

          <DesktopNavbar />
          <MobileNavbar username={username} />
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
