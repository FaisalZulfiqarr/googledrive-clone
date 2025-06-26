import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/typeorm";
import File from "@/entities/File";
import fs from "fs-extra";
import path from "path";

//Delete a File
export async function DELETE(req, { params }) {
  try{
    const { id } = await params;
    const db = await getDataSource();
    const fileRepo = db.getRepository(File);
  
    const file = await fileRepo.findOne({ where: { id: parseInt(id) } });
    if (!file)
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    const filePath = path.join(process.cwd(), file.url);
    await fs.remove(filePath);
  
    await fileRepo.remove(file);
    return NextResponse.json({ message: "File deleted successfully" }, { status: 200 });
  }catch(error){
    console.error("[DELETE_FILE_ERROR]:", error);
    return NextResponse.json({ error: "Failed to delete file" }, { status: 500 });
  }
}
