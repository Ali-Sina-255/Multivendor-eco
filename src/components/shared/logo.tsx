import React, { FC } from "react";
import logo from "../../../public/assets/icons/logo-1.png";
interface LogoProps {
  width: string;
  height: string;
}
const Logo: FC<LogoProps> = ({ width, height }) => {
  return (
    <div className="z-50" style={{ width: width, height: height }}>
      Logo
    </div>
  );
};

export default Logo;
