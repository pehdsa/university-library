"use client";

import React, { useRef, useState } from "react";
import config from "@/lib/config";
// import { ImageKitProvider } from "@imagekit/next";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { Button } from "./ui/button";
import Image from "next/image";

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

export const ImageUpload = () => {
  const ikUploadRef = useRef(null);
  const [file, setFilde] = useState<{ filePath: string } | null>(null);

  const onError = () => {};

  const onSuccess = () => {};

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

      <Button className="upload-btn">
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
          className="object-contain"
        />
      </Button>
    </ImageKitProvider>
  );
};
