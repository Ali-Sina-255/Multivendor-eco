import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user?.privateMetadata?.role || user?.privateMetadata.role === "USER")
    redirect("/");
  if (user.privateMetadata.role === "ADMIN") redirect("/dashboard/admin");
  if (user.privateMetadata.role === "SELLER") redirect("/dashboard/seller");

  // const role = user?.privateMetadata?.role;

  // if (!role) {
  //   return <p>Setting up your account...</p>;
  // }

  // if (role === "ADMIN") redirect("/dashboard/admin");
  // else if (role === "SELLER") redirect("/dashboard/seller");
  // else redirect("/");
};

export default DashboardPage;
