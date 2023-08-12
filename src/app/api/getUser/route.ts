import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return redirect("/signin");
  const userProfile = await prisma.profile.findUnique({
    where: {
      userid: id,
    },
  });
  return NextResponse.json({ ...userProfile });
}
