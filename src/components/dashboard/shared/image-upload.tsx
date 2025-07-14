// components/shared/image-upload.tsx
"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  type: "standard" | "profile" | "cover";
  dontShowPreview?: boolean;
  error?: boolean;
  cloudinary_key: string;
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  type,
  dontShowPreview,
  error,
  cloudinary_key,
}) => {
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (error) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (type === "profile") {
    return (
      <div
        className={cn(
          "relative rounded-full w-52 h-52 bg-gray-200 border-2 border-white shadow-2xl overflow-visible",
          {
            "bg-red-100": error,
            "animate-pulse": isBouncing,
          }
        )}
      >
        {value.length > 0 && (
          <Image
            src={value[0]}
            alt=""
            width={300}
            height={300}
            className="w-52 h-52 rounded-full object-cover absolute top-0 left-0 bottom-0 right-0"
          />
        )}
        <CldUploadWidget onSuccess={onUpload} uploadPreset={cloudinary_key}>
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()} // ✅ Correct usage
              disabled={disabled}
              className="z-20 absolute right-0 bottom-6 flex items-center font-medium text-[17px] h-14 w-14 justify-center text-white bg-gradient-to-t from-blue-primary to-blue-300 border-none shadow-lg rounded-full hover:shadow-md active:shadow-sm"
            >
              {/* your icon */}
            </button>
          )}
        </CldUploadWidget>
      </div>
    );
  }

  return null;
};

export default ImageUpload;
