"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Car } from "lucide-react";

export default function UploadForm({
  onImageProcessed,
}: {
  onImageProcessed: (url: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    const res = await fetch("/remove-bg", {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);
    onImageProcessed(imageUrl);
    setLoading(false);
  };

  return (
    <Card className="p-4">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-2"
      />
      <Button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Processing..." : "Removing Backgrund"}
      </Button>
    </Card>
  );
}
