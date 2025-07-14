"use client";

import { FC, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 } from "uuid";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Category } from "@/generated/prisma";
import { CategoryFormSchema } from "@/lib/schemas";

import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import ImageUpload from "../shared/image-upload";

import { upsertCategory } from "@/queries/category";

interface CategoryDetailsProps {
  data?: Category;
}

const CategoryDetails: FC<CategoryDetailsProps> = ({ data }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: data?.name || "",
      image: data?.image ? [{ url: data.image }] : [],
      url: data?.url || "",
      featured: data?.featured || false,
    },
  });

  const isLoading = form.formState.isSubmitting;

  // Reset on client after hydration
  useEffect(() => {
    if (typeof window !== "undefined" && data) {
      form.reset({
        name: data.name || "",
        image: data.image ? [{ url: data.image }] : [],
        url: data.url || "",
        featured: data.featured || false,
      });
    }
  }, [data, form]);

  const handleSubmit: SubmitHandler<
    z.infer<typeof CategoryFormSchema>
  > = async (values) => {
    try {
      // Let server/database handle createdAt/updatedAt
      const now = new Date();

      const response = await upsertCategory({
        id: data?.id || v4(),
        name: values.name,
        image: values.image[0]?.url || "",
        url: values.url,
        featured: values.featured,
        createdAt: data?.createdAt ?? now,
        updateAt: now,
      });

      toast(data?.id ? "Category updated!" : `Created: "${response.name}"`);

      if (data?.id) {
        router.refresh();
      } else {
        router.push("/dashboard/admin/categories");
      }
    } catch (err: any) {
      console.error("Upsert failed", err);
      toast.error(err?.message || "Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
          <CardDescription>
            {data?.id
              ? `Edit "${data.name}" category`
              : "Create a new category – you can edit it later."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        type="profile"
                        value={field.value.map((i) => i.url)}
                        disabled={isLoading}
                        onChange={(u) => field.onChange([{ url: u }])}
                        onRemove={(u) =>
                          field.onChange(field.value.filter((i) => i.url !== u))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input placeholder="/category-url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-start space-x-3 border p-4 rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        // @ts-ignore
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This category will appear on the homepage.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "Saving..."
                  : data?.id
                  ? "Update Category"
                  : "Create Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CategoryDetails;
