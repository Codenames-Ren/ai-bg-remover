"use client";

import UploadForm from "@/components/UploadForm";
import ResultPreview from "@/components/ResultPreview";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");

  const handleReset = () => {
    setImageUrl("");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-blue-500 text-black font-mono">
      <h1 className="text-3xl font-bold mb-6 border-4 border-black p-2 bg-white shadow-neo shadow-[8px_8px_0px_black] hover:shadow-[2px_2px_0px_black] transition-all duration-200">
        AI Background Remover
      </h1>
      <UploadForm onImageProcessed={setImageUrl} />
      {imageUrl && <ResultPreview imageUrl={imageUrl} onReset={handleReset} />}
    </main>
  );
}
