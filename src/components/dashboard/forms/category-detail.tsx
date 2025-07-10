"use client";

import { Category } from "@/generated/prisma";
import { CategoryFormSchema } from "@/lib/schemas";
import { FC, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { AlertDialog } from "@/components/ui/alert-dialog";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface CategoryDetailProps {
  data?: Category[]; // Array of categories
}

const CategoryDetail: FC<CategoryDetailProps> = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const route = useRouter();

  // Initialize the form
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(CategoryFormSchema),
    defaultValues: {
      name: data?.[0]?.name || "", // Default to empty string if no data
      image: data?.[0]?.image ? [{ url: data?.[0]?.image }] : [], // Default to empty array if no image
      url: data?.[0]?.url || "", // Default to empty string if no URL
      featured: data?.[0]?.featured || false, // Default to false if no featured status
    },
  });

  // Check if form is submitting
  const isLoading = form.formState.isSubmitting;

  // Reset the form whenever 'data' changes
  useEffect(() => {
    if (data && data.length > 0) {
      form.reset({
        name: data[0]?.name || "",
        image: data[0]?.image ? [{ url: data[0]?.image }] : [],
        url: data[0]?.url || "",
        featured: data[0]?.featured || false,
      });
    }
  }, [data, form]);

  // Handle form submission
  const handelSubmit = async (values: z.infer<typeof CategoryFormSchema>) => {
    console.log(values);
  };

  return (
    <AlertDialog>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Category INFORMATION</CardTitle>
          <CardDescription>
            {data?.id
              ? `Update ${data?.name} category information.`
              : "Lets create a category . you can edit category later from the categories table page "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handelSubmit)}
              className="space-y-4"
            >
              <FormField
                disabled={isLoading}
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>

                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Url</FormLabel>

                    <FormControl>
                      <Input placeholder="/category-url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Featured</FormLabel>

                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        This Category will appear on the home page
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? "loading...."
                  : data?.id
                  ? "save Category Information"
                  : "Create Category"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AlertDialog>
  );
};

export default CategoryDetail;
