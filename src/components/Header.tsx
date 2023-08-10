import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import MenuThemeToggle from "@/components/MenuThemeToggle";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header({
  name,
  image,
  firstLetterOfFirstName,
  firstLetterOfLastName,
}: {
  name: string | null | undefined;
  image: string | null | undefined;
  firstLetterOfFirstName: string | undefined;
  firstLetterOfLastName: string | undefined;
}) {
  return (
    <section className="flex items-center justify-between px-5 md:p-0">
      <Image
        src="/devchallenges.svg"
        alt="logo"
        width={150}
        height={150}
        className="dark:hidden block w-32 h-5"
      />
      <Image
        src="/devchallenges-light.svg"
        alt="logo"
        width={150}
        height={150}
        className="hidden dark:block w-32 h-5"
      />
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center space-x-3 outline outline-none md:outline-black/10 md:dark:outline-white/10 p-1 rounded">
          <Avatar>
            {image && <AvatarImage src={image} />}
            <AvatarFallback>
              {firstLetterOfFirstName}
              {firstLetterOfLastName}
            </AvatarFallback>
          </Avatar>
          <span className="font-bold hidden md:inline-block">{name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-medium md:mt-2">
          <DropdownMenuItem className="flex items-center gap-2">
            <Image
              src="/icons/userLight.png"
              width={20}
              height={20}
              alt="user-icon"
              priority={true}
              className="dark:hidden"
            />
            <Image
              src="/icons/userDark.png"
              width={20}
              height={20}
              alt="user-icon"
              priority={true}
              className="hidden dark:block"
            />
            <span>My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Image
              src="/icons/teamLight.png"
              width={20}
              height={20}
              alt="user-icon"
              priority={true}
              className="dark:hidden"
            />
            <Image
              src="/icons/teamDark.png"
              width={20}
              height={20}
              alt="user-icon"
              priority={true}
              className="hidden dark:block"
            />
            <span>Group Chat</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Toggle theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <MenuThemeToggle />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
}
