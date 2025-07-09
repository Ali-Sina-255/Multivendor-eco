import { currentUser } from "@clerk/nextjs/server";
import React, { FC } from "react";
interface SidebarProps {
  isAdmin: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isAdmin }) => {
  const user = currentUser();

  return (
    <div className="w-[300px] border-r h-screen p-4 flex flex-col fixed top-0 left-0 bottom-0">
        
    </div>
  );
};
export default Sidebar;
