"use server";
import { prisma } from "@/lib/prisma";
// model
import { Category } from "@/generated/prisma";
// clerk
import { currentUser } from "@clerk/nextjs/server";

export const upsertCategory = async (category: Category) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Unauthenticated User .");

    if (user.privateMetadata.role !== "ADMIN") {
      throw new Error(
        "Unauthorized Access: Admin privilege Required for Entry ."
      );
    }

    // ensure the category data is provided
    if (!category) {
      throw new Error("Please provide category data. ");
    }

    // same name for category and category url
    const existingCategory = await prisma.category.findFirst({
      where: {
        AND: [
          {
            OR: [{ name: category.name }, { url: category.url }],
          },
          {
            NOT: { id: category.id },
          },
        ],
      },
    });
    if (existingCategory) {
      let errorMessage = "";
      if (existingCategory.name === category.name) {
        errorMessage = "A category with the same name is already exists.";
      } else if (existingCategory.url === category.url) {
        errorMessage = "A category with the same URL is already exists.";
      }
      throw new Error(errorMessage);
    }

    const categoryDetail = await prisma.category.upsert({
      where: { id: category.id },
      update: category,
      create: category,
    });

    return categoryDetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// Function getAllCategories
export const getAllCategories = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return categories;
};

// Function : getCategory

export const getCategory = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return category;
};

// function : deleteCategory

export const deleteCategory = async (categoryId: string) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthenticated... ");

  if (user.privateMetadata.role !== "ADMIN") {
    throw new Error(
      "Unauthorized Access: Admin Privilege is Required for Delete"
    );
  }
  if (!categoryId) throw new Error("Please provide Category ID.");
  const response = await prisma.category.delete({ where: { id: categoryId } });
  return response;
};
