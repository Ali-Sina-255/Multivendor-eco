import { Category } from "@/generated/prisma";
import { FC } from "react";

interface CategoryDetailProps {
  data?: Category[];
}

const categoryDetails: FC<CategoryDetailProps> = ({ data }) => {
  return <div></div>;
};
export default categoryDetails;
