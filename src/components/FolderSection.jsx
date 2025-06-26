"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import  CreateFolderModal from "./CreateFolderModal";
import EditFolderModal from "./EditFolderModal";
import FolderCard from "./FolderCard";
import UploadFileModal from "./UploadFileModal";
import FileCard from "./FileCard";
import GridViewIcon from "@/icons/GridViewIcon";
import ListViewIcon from "@/icons/ListViewIcon";
import AddFolderIcon from "@/icons/AddFolderIcon";
import AddFileIcon from "@/icons/AddFileIcon";
import EditIcon from "@/icons/EditIcon";

export default function FolderSection({ userId }) {
  const [folderList, setFolderList] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [breadcrumb, setBreadcrumb] = useState([]);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isEditingFolder, setIsEditingFolder] = useState(false);
  const [viewType, setViewType] = useState("grid");
  const [isUploadingFile, setIsUploadingFile] = useState(false);

  useEffect(() => {
    fetchFoldersAndFiles();
  }, [userId, activeFolder]);

  const fetchFoldersAndFiles = async () => {
    await Promise.all([loadFolders(), loadFiles()]);
  };

  const loadFolders = async () => {
    const response = await fetch(
      `/api/folders?userId=${userId}&parentId=${activeFolder?.id || null}`
    );
    const data = await response.json();
    setFolderList(data);
  };

  const loadFiles = async () => {
    const response = await fetch(
      `/api/files?userId=${userId}&folderId=${activeFolder?.id || null}`
    );
    const data = await response.json();
    setFileList(data);
  };

  const enterFolder = (folder) => {
    setActiveFolder(folder);
    setBreadcrumb((prev) => [...prev, folder]);
    setFolderList([]);
    setFileList([]);
  };

  const goBack = () => {
    const updated = [...breadcrumb];
    updated.pop();
    setBreadcrumb(updated);
    const previous = updated[updated.length - 1] || null;
    setActiveFolder(previous);
    setFolderList([]);
    setFileList([]);
  };

  const createFolder = async (folderName) => {
    const response = await fetch("/api/folders", {
      method: "POST",
      body: JSON.stringify({
        name: folderName,
        userId,
        parentId: activeFolder?.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Folder created!");
      setIsCreatingFolder(false);
      await loadFolders();
    } else {
      toast.error("Failed to create folder.");
    }
  };

  const updateFolderName = async (newName) => {
    const response = await fetch(`/api/folders/${activeFolder.id}`, {
      method: "PUT",
      body: JSON.stringify({ name: newName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Folder name updated.");
      setIsEditingFolder(false);
      const updated = { ...activeFolder, name: newName };
      setActiveFolder(updated);
      setBreadcrumb((path) =>
        path.map((f) => (f.id === updated.id ? updated : f))
      );
    } else {
      toast.error("Update failed.");
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Folder deleted.");
        await loadFolders();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Error deleting folder.");
    }
  };

  const deleteFile = async (fileId) => {
    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await loadFiles();
      } else {
        toast.error("Failed to delete file.");
      }
    } catch (err) {
      console.error("File delete error:", err);
      toast.error("Error deleting file.");
    }
  };

  const handleUploadComplete = async () => {
    toast.success("File uploaded.");
    setIsUploadingFile(false);
    await loadFiles();
  };

  return (
    <div className="p-6 h-screen bg-white max-w-7xl mx-auto">
      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-4 mb-4">
        <div className="flex gap-3">
          <button
            onClick={() => setIsCreatingFolder(true)}
            className="flex gap-1 items-center px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded"
          >
            <AddFolderIcon />
            Create Folder
          </button>
          <button
            onClick={() => setIsUploadingFile(true)}
            className="flex gap-1 items-center px-3 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded"
          >
            <AddFileIcon />
            Upload File
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewType("grid")}
            className={`p-2 rounded ${
              viewType === "grid"
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            title="Grid View"
          >
            <GridViewIcon />
          </button>
          <button
            onClick={() => setViewType("list")}
            className={`p-2 rounded ${
              viewType === "list"
                ? "bg-gray-400 text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            title="List View"
          >
            <ListViewIcon />
          </button>
        </div>
      </div>

      {/* Header and Breadcrumb */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-blue-600">
          Your Folders & Files
        </h2>
        {activeFolder && (
          <button
            onClick={() => setIsEditingFolder(true)}
            className="flex gap-1 items-center px-3 py-1 rounded bg-gray-200 text-black hover:bg-gray-300"
          >
            <EditIcon />
            Rename Folder
          </button>
        )}
      </div>

      {breadcrumb.length > 0 && (
        <div className="text-gray-400 flex items-center gap-2 mb-4">
          <button
            onClick={goBack}
            className="text-black hover:underline hover:text-gray-500 text-sm"
          >
            Back
          </button>
          <span>/</span>
          {breadcrumb.map((f, i) => (
            <span key={f.id}>
              {f.name}
              {i < breadcrumb.length - 1 && <span> / </span>}
            </span>
          ))}
        </div>
      )}

      {/* Folder & File Display */}
      {folderList.length === 0 && fileList.length === 0 ? (
        <p className="text-black text-center mt-10">
          No folders or files to show.
        </p>
      ) : (
        <div
          className={
            viewType === "grid"
              ? "grid grid-cols-4 gap-4"
              : "flex flex-col gap-4 items-center"
          }
        >
          {folderList.map((folder) => (
            <FolderCard
              key={folder.id}
              folder={folder}
              view={viewType}
              onClick={enterFolder}
              onDelete={deleteFolder}
            />
          ))}
          {fileList.map((file) => (
            <FileCard
              key={file.id}
              file={file}
              onDelete={() => deleteFile(file.id)}
              view={viewType}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      {isCreatingFolder && (
        <CreateFolderModal
          onCreate={createFolder}
          onClose={() => setIsCreatingFolder(false)}
        />
      )}

      {isEditingFolder && (
        <EditFolderModal
          currentName={activeFolder?.name}
          onEdit={updateFolderName}
          onClose={() => setIsEditingFolder(false)}
        />
      )}

      {isUploadingFile && (
        <UploadFileModal
          onClose={() => setIsUploadingFile(false)}
          userId={userId}
          folderId={activeFolder?.id}
          onSuccess={handleUploadComplete}
        />
      )}
    </div>
  );
}
