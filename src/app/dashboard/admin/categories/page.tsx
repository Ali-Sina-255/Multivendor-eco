import CategoryDetails from "@/components/dashboard/forms/category-detail";
import DataTable from "@/components/ui/data-table";
import { getAllCategories } from "@/queries/category";
import { Plus } from "lucide-react";
import { columns } from "./columns";

const AdminCategoriesPage = async () => {
  const categories = await getAllCategories();
  if (!categories) return null;

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
        </>
      }
      modalChildren={<CategoryDetails />}
      filterValue="name"
      data={categories}
      searchPlaceholder="Search category name."
      columns={columns}
    />
  );
};

export default AdminCategoriesPage;
