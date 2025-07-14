"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/remove-bg`, {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const imageUrl = URL.createObjectURL(blob);
    onImageProcessed(imageUrl);
    setLoading(false);
  };

  return (
    <Card className="p-10 bg-blue-700 shadow-[12px_12px_0px_black] hover:shadow-[2px_2px_0px_black] transition-all duration-200 text-white">
      <div className="grid w-full max-w-80 items-center gap-1.5">
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-white shadow-[6px_6px_0px_black] hover:shadow-[1px_1px_0px_black] transition-all duration-200"
        />
      </div>
      <Button
        onClick={handleUpload}
        disabled={loading || !file}
        className="text-white shadow-[6px_6px_0px_black] hover:shadow-[1px_1px_0px_black] transition-all duration-200 bg-green-500"
      >
        {loading ? "Processing..." : "Removing Background"}
      </Button>
    </Card>
  );
}
