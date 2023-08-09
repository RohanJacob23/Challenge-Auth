"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { ExitIcon } from "@radix-ui/react-icons";

export default function LogoutButton() {
  return (
    <DropdownMenuItem
      className="text-[#EB5757] space-x-2"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <ExitIcon />
      <span>Logout</span>
    </DropdownMenuItem>
  );
}
