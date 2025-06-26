"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
import DeleteIcon from "@/icons/DeleteIcon";
import FolderIcon from "@/icons/FolderIcon";

export default function FolderCard({
  folder,
  onClick,
  onDelete,
  view = "grid",
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = () => {
    if (onClick) onClick(folder);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await onDelete(folder.id);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(
        typeof err === "string"
          ? err
          : err?.message || "Failed to delete the folder!"
      );
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  const cancelDelete = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const GridView = () => (
    <div
      className="relative border-l-4 border-blue-500 p-5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <FolderIcon className="text-blue-600 w-6 h-6" />
        <h3 className="text-lg font-semibold truncate text-blue-700 dark:text-blue-300">
          {folder.name}
        </h3>
      </div>

      <button
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        title="Delete folder"
      >
        <DeleteIcon />
      </button>

      {showConfirm && (
        <ConfirmationModal
          itemName={folder.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );

  const ListView = () => (
    <li
      className="flex items-center justify-between border-l-4 border-blue-500 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm hover:shadow-md transition cursor-pointer w-full"
      onClick={handleClick}
    >
      <span className="flex items-center gap-2 truncate text-blue-700 dark:text-blue-300">
        <FolderIcon className="w-5 h-5" />
        {folder.name}
      </span>
      <button
        onClick={handleDeleteClick}
        className="text-sm text-red-500 hover:text-red-700 hover:underline"
      >
        Delete
      </button>

      {showConfirm && (
        <ConfirmationModal
          itemName={folder.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          isDeleting={isDeleting}
        />
      )}
    </li>
  );

  return view === "grid" ? <GridView /> : <ListView />;
}
