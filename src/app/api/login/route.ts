import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyPassword } from "@/lib/password";
import { userRoles } from "@/types/auth";

export async function POST(request: Request) {
    try {
        const { username, password, role } = await request.json();

        if (
            typeof username !== "string" ||
            typeof password !== "string" ||
            typeof role !== "string" ||
            !userRoles.includes(role as (typeof userRoles)[number])
        ) {
            return NextResponse.json(
                { error: "Username, password, and a valid role are required" },
                { status: 400 }
            );
        }

        await dbConnect();
        const user = await User.findOne({ username, role }).select("+password");

        if (!user || !(await verifyPassword(password, user.password))) {
            return NextResponse.json(
                { error: "That username or password is not valid." },
                { status: 401 }
            );
        }

        return NextResponse.json({
            success: true,
            user: { id: user._id, username: user.username, role: user.role },
        });
    } catch (error) {
        console.error("Login failed:", error);
        return NextResponse.json(
            { error: "Unable to sign in right now" },
            { status: 500 }
        );
    }
}
