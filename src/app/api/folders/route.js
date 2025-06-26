import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/typeorm";
import Folder from "@/entities/Folder";

//Get Folders
export async function GET(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const parentParam = url.searchParams.get("parentId");

  const parentFolderId =
    parentParam && parentParam !== "null" && !isNaN(+parentParam)
      ? Number(parentParam)
      : null;

  try {
    const db = await getDataSource();
    const folderRepository = db.getRepository(Folder);

    const query = folderRepository
      .createQueryBuilder("folder")
      .leftJoinAndSelect("folder.parent", "parent")
      .leftJoin("folder.user", "user")
      .where("user.id = :userId", { userId });

    if (parentFolderId !== null) {
      query.andWhere("parent.id = :parentFolderId", { parentFolderId });
    } else {
      query.andWhere("folder.parentId IS NULL");
    }

    const results = await query.getMany();

    return NextResponse.json(results);
  } catch (err) {
    console.error("GET /folders error:", err);
    return NextResponse.json(
      { message: "Failed to fetch folders." },
      { status: 500 }
    );
  }
}

//Create a Folder
export async function POST(request) {
  try {
    const { name, userId, parentId } = await request.json();
    if (!name || !userId) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const db = await getDataSource();
    const folderRepo = db.getRepository(Folder);

    const folderData = {
      name,
      user: { id: Number(userId) },
      ...(parentId && { parent: { id: Number(parentId) } }),
    };

    await folderRepo.save(folderData);

    return NextResponse.json(
      { message: "Folder successfully created." },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /folders error:", err);
    return NextResponse.json(
      { message: "An error occurred while creating the folder." },
      { status: 500 }
    );
  }
}
