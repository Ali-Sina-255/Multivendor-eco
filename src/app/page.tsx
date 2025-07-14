import ThemeToggle from "@/components/shared/theme-toggle";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const user = await currentUser();
  if (!user || user.privateMetadata.role !== "ADMIN") redirect("/");
  return (
    <div className="p-5">
      <div className="flex gap-x-5 justify-end ">
        <UserButton />
        <ThemeToggle />
      </div>
      <h1 className="text-blue-500 font-barlow">Home page</h1>
    </div>
  );
}
