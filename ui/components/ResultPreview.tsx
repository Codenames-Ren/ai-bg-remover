"use client";

export default function ResultPreview({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg mb-2 text-white text-shadow-[2px_2px_0px_black]">
        Result Preview :{" "}
      </h2>
      <img
        src={imageUrl}
        alt="Processed"
        className="w-auto max-h-96 border border-dashed border-gray-300"
      />
      <a
        href={imageUrl}
        download="output.png"
        className="flex mt-3 px-4 py-2 bg-blue-700 shadow-[6px_6px_0px_black] hover:shadow-[1px_1px_0px_black] transition-all duration-200 text-white rounded justify-center"
      >
        Download
      </a>
    </div>
  );
}
