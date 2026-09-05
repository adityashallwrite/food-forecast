import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/lib/password";
import { userRoles, UserRole } from "@/types/auth";

export async function GET() {
    try {
        await dbConnect();
        const users = await User.find().select("username role");
        return NextResponse.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
} 

export async function POST(request: Request) {
  try {
    await dbConnect();

    const { username, password, role = "student" } = await request.json();

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof role !== "string" ||
      !userRoles.includes(role as (typeof userRoles)[number])
    ) {
      return NextResponse.json(
        { success: false, error: "Username, password, and a valid role are required" },
        { status: 400 }
      );
    }

    const validatedRole = role as UserRole;

    const newUser = await User.create({
      username,
      password: await hashPassword(password),
      role: validatedRole,
    });

    return NextResponse.json(
      { success: true, data: { id: newUser._id, username: newUser.username, role: newUser.role } },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unable to create user";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}