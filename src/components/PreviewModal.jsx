"use client";

export default function PreviewModal({ file, onClose }) {
  const extension = file.name.split(".").pop().toLowerCase();

  const isImage = ["jpg", "jpeg", "png", "gif", "webp", "bmp", "svg"].includes(
    extension
  );

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="bg-gray-800 max-w-3xl w-full p-4 rounded shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-lg font-bold text-red-500 hover:text-red-700"
          onClick={onClose}
        >
          ✖
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">{file.name}</h2>

        {isImage && (
          <img
            src={file.url.replace(/^http:\/\//, "https://")}
            alt={file.name}
            className="max-h-[70vh] w-full object-contain rounded"
          />
        )}

        {!isImage && (
          <p className="text-center text-gray-600 dark:text-gray-300">
            This file format cannot be previewed.
          </p>
        )}
      </div>
    </div>
  );
}
