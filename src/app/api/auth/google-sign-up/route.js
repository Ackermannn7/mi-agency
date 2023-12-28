import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import client from "@/_libs/prisma/client";

export async function POST(req) {
  const user = await client.user;

  const body = await req.json();
  const { email, password, username, scopes = [], isRegistered = false } = body;

  const hashedPassword = await bcrypt.hash(password, 5);

  const findUserInDatabase = await user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUserInDatabase) {
    return NextResponse.json({
      code: 1001,
      message: "User already exists",
    });
  }

  if (password.length < 6) {
    return NextResponse.json({
      code: 1002,
      message: "Password must be at least 6 characters",
    });
  }

  const createdUser = await user.create({
    data: {
      email: email,
      password: hashedPassword,
      username: username,
      scopes: scopes,
      avatar: avatar,
    },
  });

  return NextResponse.json([
    { code: 200, message: "User successfully created" },
    { data: createdUser },
  ]);
}

export async function PUT(req) {
  const user = await client.user;
  const body = await req.json();
  const { email, username, scopes = [], isRegistered } = body;

  const findUserInDatabase = await user.findUnique({
    where: {
      email: email,
    },
  });

  if (!findUserInDatabase) {
    return NextResponse.json({
      code: 1003,
      message: "User not found",
    });
  }

  // if (password && password.length < 6) {
  //   return NextResponse.json({
  //     code: 1004,
  //     message: "Password must be at least 6 characters",
  //   });
  // }

  const updateData = {
    username,
    scopes,
    isRegistered,
  };

  // if (password) {
  //   const hashedPassword = await bcrypt.hash(password, 5);
  //   updateData.password = hashedPassword;
  // }

  const updatedUser = await user.update({
    where: {
      email: email,
    },
    data: updateData,
  });

  return NextResponse.json({
    code: 200,
    message: "User successfully updated",
    data: updatedUser,
  });
}
