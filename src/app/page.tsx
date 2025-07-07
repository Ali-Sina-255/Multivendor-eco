import Image from "next/image";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/shared/theme-toggle";
export default function Home() {
  return (
    <div className="p-5">
      <div className="flex gap-x-5 justify-end ">
        <ThemeToggle />
      </div>
      <h1 className="text-blue-500 font-barlow">Home page</h1>
    </div>
  );
}
