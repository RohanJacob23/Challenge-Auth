import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { Profile } from "@/types/types";

export async function POST(request: Request) {
  const { id, bio, email, image, name, password, phone }: Profile =
    await request.json();
  const updateUserProfile = await prisma.profile.update({
    where: { id },
    data: {
      bio,
      email,
      image: image ?? "",
      name,
      password,
      phone,
    },
  });
  return NextResponse.json({ ...updateUserProfile });
}
