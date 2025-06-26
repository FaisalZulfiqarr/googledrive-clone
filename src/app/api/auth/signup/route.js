import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/typeorm";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const dataSource = await getDataSource();
    const userRepository = dataSource.getRepository("User");

    const userExists = await userRepository.findOneBy({ email });

    if (userExists) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = userRepository.create({
      name,
      email,
      password: encryptedPassword,
    });

    await userRepository.save(newUser);

    return NextResponse.json(
      { message: "Registration successful." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong during registration." },
      { status: 500 }
    );
  }
}
