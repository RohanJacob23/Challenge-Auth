import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  if (!email) return redirect("/signin");
  const userProfile = await prisma.profile.findUnique({
    where: { email },
  });
  return NextResponse.json({ ...userProfile });
}
