import { UserButton } from "@clerk/nextjs";
import ThemeToggle from "@/components/shared/theme-toggle";
import React from "react";

function Header() {
  return (
    <header
      role="banner"
      className="fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md gap-4 flex items-center border-b"
    >
      <div className="flex items-center gap-2 ml-auto">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}

export default Header;
