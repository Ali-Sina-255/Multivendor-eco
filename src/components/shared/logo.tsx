import React, { FC } from "react";

import Image from "next/image";
// log image
import logo from "../../../public/assets/icons/logo-1.png";
interface LogoProps {
  width: string;
  height: string; 
}
const Logo: FC<LogoProps> = ({ width, height }) => {
  return (
    <div className="z-50" style={{ width: width, height: height }}>
      <Image
        src={logo}
        alt="GoShop"
        className="w-full h-full object-cover overflow-visible"
      />
    </div>
  );
};

export default Logo;
