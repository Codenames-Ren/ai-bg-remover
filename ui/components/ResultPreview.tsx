"use client";

import { Button } from "@/components/ui/button";

export default function ResultPreview({
  imageUrl,
  onReset,
}: {
  imageUrl: string;
  onReset: () => void;
}) {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg mb-2 text-white text-shadow-[2px_2px_0px_black]">
        Result Preview :
      </h2>

      <img
        src={imageUrl}
        alt="Processed"
        className="w-auto max-h-96 border border-dashed border-gray-300"
      />

      <div className="flex justify-center gap-4 mt-3">
        <a href={imageUrl} download="output.png">
          <Button className="bg-blue-700 shadow-[6px_6px_0px_black] hover:shadow-[1px_1px_0px_black] transition-all duration-200 text-white">
            Download
          </Button>
        </a>

        <Button
          onClick={onReset}
          className="bg-red-600 shadow-[6px_6px_0px_black] hover:shadow-[1px_1px_0px_black] transition-all duration-200 text-white"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
