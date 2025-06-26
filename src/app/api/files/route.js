import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/typeorm";
import fs from "fs-extra";
import path from "path";
import File from "@/entities/File";

//Get Files
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const folderId = searchParams.get("folderId");
  const fid =
    folderId && folderId !== "null" && !isNaN(parseInt(folderId))
      ? parseInt(folderId)
      : null;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const dataSource = await getDataSource();
    const fileRepo = dataSource.getRepository(File);

    const files = await fileRepo
      .createQueryBuilder("file")
      .leftJoinAndSelect("file.folder", "folder")
      .where("file.userId = :userId", { userId })
      .andWhere(fid !== null ? "folder.id = :fid" : "file.folderId IS NULL", {
        fid,
      })
      .orderBy("file.id", "DESC")
      .getMany();

    return NextResponse.json(files);
  } catch (err) {
    console.error("[FILES_GET]", err);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

//Create Files
export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const userId = data.get("userId");
    const folderId = data.get("folderId");

    const fid =
      folderId && folderId !== "null" && !isNaN(parseInt(folderId))
        ? parseInt(folderId)
        : null;

    if (!file || file.size > 64 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadsDir = path.join(process.cwd(), "public/uploads");
    await fs.ensureDir(uploadsDir);

    const filePath = path.join(uploadsDir, file.name);
    await fs.writeFile(filePath, buffer);

    const db = await getDataSource();
    const fileRepo = db.getRepository(File);

    await fileRepo.save({
      name: file.name,
      url: `uploads/${file.name}`,
      folder: fid ? { id: parseInt(fid) } : null,
      user: { id: parseInt(userId) },
      resourceType: file.type || "file",
    });

    return NextResponse.json(
      { message: "File saved locally." },
      { status: 201 }
    );
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { message: "Error uploading file" },
      { status: 500 }
    );
  }
}
