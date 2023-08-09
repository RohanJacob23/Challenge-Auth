"use client";

import React from "react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function MenuThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        System
      </DropdownMenuItem>
    </>
  );
}
