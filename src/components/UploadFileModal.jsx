"use client";
import { useState } from "react";

export default function UploadFileModal({
  onClose,
  userId,
  folderId,
  onSuccess,
}) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!file) return;

      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);
      formData.append("folderId", folderId);

      const res = await fetch("/api/files", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        await onSuccess();
        setLoading(false);
      } else {
        alert(data.error || "Failed to upload file.");
      }
    } catch (err) {
      console.error("Error deleting file:", err);
      toast.error(err);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-gray-800 text-black p-10 rounded shadow-lg w-md">
        <h2 className="text-xl mb-8 text-white">Upload File</h2>
        <form onSubmit={handleUpload}>
          <input
            required
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border border-gray-300 bg-white rounded mb-8 w-full file:hover:cursor-pointer file:bg-gray-400 file:p-3 file:me-3"
          />
          <div className="flex justify-end gap-3 text-white font-semibold">
            <button
              onClick={onClose}
              className="hover:cursor-pointer px-3 py-2 bg-red-500 rounded hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="hover:cursor-pointer px-4 py-2 bg-blue-600 rounded hover:bg-blue-800"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}