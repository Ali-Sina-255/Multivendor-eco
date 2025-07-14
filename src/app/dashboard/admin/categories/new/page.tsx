import CategoryDetail from "@/components/dashboard/forms/category-detail";

import React from "react";

const AdminNewCategoriesPage = () => {
  const CLOUDINARY_CLOUD_PRESET =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET_NAME;
  if (!CLOUDINARY_CLOUD_PRESET) return null;
  return (
    <div className="w-full">
      <CategoryDetail cloudinary_key={CLOUDINARY_CLOUD_PRESET} />
    </div>
  );
};

export default AdminNewCategoriesPage;
