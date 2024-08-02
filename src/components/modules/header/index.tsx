import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme/theme-toggle";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuList, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { HeaderProps } from "@/types/HeaderProps";
import { getInitials } from "@/utils";

import Drone3DLogo from "@/assets/icons/drone-3d.svg";

export function Header({ user }: HeaderProps) {
  return (
    <header className="flex fixed h-20 w-full shrink-0 px-4 md:px-6">
      <div className="flex m-auto w-4/5 items-center justify-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link to="#">
              <img src={Drone3DLogo} className="h-12 w-12" />
            </Link>
            <div className="grid gap-2 py-6">
              <Link to="#" className="flex w-full items-center py-2 text-lg font-semibold">
                Home
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Link to="#" className="mr-6 hidden lg:flex">
          <img src={Drone3DLogo} className="h-12 w-12" />
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                to="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-gray-800/50 dark:data-[state=open]:bg-gray-800/50"
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto flex gap-2">
          <ModeToggle />

          {user?._id ? (
            <div className="ml-5">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{getInitials(user?.firstname, user?.lastname)} </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}