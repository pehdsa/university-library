"use client";

import React, { useRef, useState } from "react";
import config from "@/lib/config";
// import { ImageKitProvider } from "@imagekit/next";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";
import { Button } from "./ui/button";
import Image from "next/image";
import { toast } from "sonner";

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request error with status: ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();

    const { token, expire, signature } = data;

    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export const ImageUpload = ({
  onFileChacge,
}: {
  onFileChacge: (filePath: string) => void;
}) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Error uploading file:", error);
    toast.error("Image Upload failed", {
      description: "Your image could not be uploaded. Please try again.",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChacge(res.filePath);
    toast.success("Image upload successfully", {
      description: `${res.filePath} has been uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={config.env.imagekit.publicKey}
      urlEndpoint={config.env.imagekit.urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        fileName="text-upload.png"
      />

      <Button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            //@ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
        <p className="text-base text-light-100">Upload a File</p>

        {file && (
          <p className="upload-filename text-light-200">{file.filePath}</p>
        )}
      </Button>

      {file && (
        <IKImage
          alt={file.filePath}
          path={file.filePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};
