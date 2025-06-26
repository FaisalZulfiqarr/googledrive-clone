"use client";
import { useState } from "react";

export default function EditFolderModal({ currentName, onEdit, onClose }) {
  const [newName, setNewName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newName.trim()) {
      try {
        setLoading(true);
        await onEdit(newName);
        setLoading(false);
      } catch (err) {
        console.error("Folder name did not updated:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-gray-800 text-black p-10 rounded shadow-lg w-md">
        <h2 className="text-xl mb-8 text-white">Edit Folder Name</h2>
        <form onSubmit={handleSubmit}>
          <input
            required
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="p-3 border bg-white border-gray-300 rounded mb-8 w-full"
          />
          <div className="flex justify-end gap-3 text-white font-semibold">
            <buttons
              type="button"
              onClick={onClose}
              className="hover:cursor-pointer px-3 py-2 bg-red-500 rounded hover:bg-red-400"
            >
              Cancel
            </buttons>
            <button
              type="submit"
              className="hover:cursor-pointer px-5 py-2 bg-blue-600 rounded hover:bg-blue-400"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
