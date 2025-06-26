"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

import ConfirmationModal from "./ConfirmationModal";
import PreviewModal from "./PreviewModal";

import DeleteIcon from "@/icons/DeleteIcon";
import FilePreviewIcon from "@/icons/FilePreviewIcon";
import FileIcon from "@/icons/FileIcon";

export default function FileCard({ file, onClick, onDelete, view = "grid" }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleClick = () => {
    if (onClick) onClick(file);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = async (e) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await onDelete(file.id);
      toast.success("File Deleted Successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(
        typeof err === "string" ? err : err?.message || "Failed to delete file"
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

  const fileExtension = file.name?.split(".").pop()?.toLowerCase();

  const isPreviewable = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "gif",
    "js",
    "json",
    "pdf",
    "doc",
    "docx",
    "txt"
  ].includes(fileExtension);

  const ActionButtons = () => (
    <div className="mt-4 flex gap-2 justify-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowPreview(true);
        }}
        className="flex gap-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-green-800"
      >
        <FilePreviewIcon />
        Preview
      </button>

      <button
        onClick={handleDeleteClick}
        className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700"
      >
        <DeleteIcon />
      </button>
    </div>
  );

  const GridView = () => (
    <div
      className="relative border border-gray-200 p-5 rounded-lg bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex gap-2 items-center mb-2">
        <FileIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        <h3 className="text-md font-medium truncate text-gray-800 dark:text-white">
          {file.name}
        </h3>
      </div>

      <ActionButtons />

      {showConfirm && (
        <ConfirmationModal
          itemName={file.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          isDeleting={isDeleting}
        />
      )}

      {showPreview && (
        <PreviewModal
          file={file}
          setShowPreview={setShowPreview}
          isPreviewable={isPreviewable}
        />
      )}
    </div>
  );

  const ListView = () => (
    <li
      className="flex items-center justify-between border p-4 rounded-lg bg-white hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 shadow-md hover:shadow-lg transition cursor-pointer w-full"
      onClick={handleClick}
    >
      <span className="flex items-center gap-2 truncate text-gray-800 dark:text-white">
        <FileIcon className="w-5 h-5" />
        {file.name}
      </span>

      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowPreview(true);
          }}
          className="text-sm text-green-600 hover:text-green-800 hover:underline"
        >
          Preview
        </button>
        <button
          onClick={handleDeleteClick}
          className="text-sm text-red-500 hover:text-red-700 hover:underline"
        >
          Delete
        </button>
      </div>

      {showConfirm && (
        <ConfirmationModal
          itemName={file.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          isDeleting={isDeleting}
        />
      )}

      {showPreview && (
        <PreviewModal
          file={file}
          setShowPreview={setShowPreview}
          isPreviewable={isPreviewable}
        />
      )}
    </li>
  );

  return view === "grid" ? <GridView /> : <ListView />;
}
