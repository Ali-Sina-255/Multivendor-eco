import Header from "@/components/dashboard/header/header";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AdminDashboardLayout = async ({ children }: { children: ReactNode }) => {
  const user = await currentUser();
  if (!user || user.privateMetadata.role !== "ADMIN") redirect("/");
  return (
    <div className="w-full h-full">
      {/* sidebar */}
      <Sidebar isAdmin />
      <div className="ml-[300px] ">
        {/* header */}
        <Header />
        <div className="m-full mt-[75px] p-4">{children}</div>
      </div>
    </div>
  );
};
export default AdminDashboardLayout;
