import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//sign up user email verification api end
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");
  const email = url.searchParams.get("email");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Email not found!" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email: email! },
    data: {
      email_verified: true,
      emailVerificationToken: token,
    },
  });

  return NextResponse.json({ message: "Email verified successfully!" });
}
