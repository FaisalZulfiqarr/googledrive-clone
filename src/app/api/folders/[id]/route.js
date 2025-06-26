import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/typeorm";

import Folder from "@/entities/Folder";
import File from "@/entities/File";

// Update Folder Name
export async function PUT(request, { params }) {
  try {
    const folderId = params.id;
    const body = await request.json();
    const { name } = body;

    const db = await getDataSource();
    const folderRepository = db.getRepository(Folder);

    await folderRepository.update(folderId, { name });

    return NextResponse.json({ message: "Folder name updated successfully." });
  } catch (err) {
    console.error("PUT /folder error:", err);
    return NextResponse.json(
      { message: "Failed to update folder name." },
      { status: 500 }
    );
  }
}

// Delete Folder
export async function DELETE(request, { params }) {
  try {
    const folderId = parseInt(params.id);

    const db = await getDataSource();
    const folderRepo = db.getRepository(Folder);
    const fileRepo = db.getRepository(File);

    const targetFolder = await folderRepo.findOne({
      where: { id: folderId },
    });

    if (!targetFolder) {
      return NextResponse.json(
        { message: "Folder not found." },
        { status: 404 }
      );
    }

    const subfolderCount = await folderRepo.count({
      where: { parent: { id: folderId } },
    });

    const filesInFolder = await fileRepo.count({
      where: { folder: { id: folderId } },
    });

    if (subfolderCount > 0 || filesInFolder > 0) {
      return NextResponse.json(
        {
          message: "Cannot delete folder. It contains files or subfolders.",
        },
        { status: 400 }
      );
    }

    await folderRepo.remove(targetFolder);

    return NextResponse.json(
      { message: "Folder removed successfully." },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /folder error:", err);
    return NextResponse.json(
      { message: "Failed to delete folder." },
      { status: 500 }
    );
  }
}
