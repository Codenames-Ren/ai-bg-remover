"use client";

export default function ResultPreview({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg mb-2">Result Preview</h2>
      <img
        src={imageUrl}
        alt="Processed"
        className="w-auto max-h-96 border border-dashed border-gray-300"
      />
      <a
        href={imageUrl}
        download="output.png"
        className="inline-block mt-3 px-4 py-2 bg-black text-white rounded"
      >
        Download
      </a>
    </div>
  );
}
