import mongoose, { Schema, Document, Model } from "mongoose";
import { UserRole, userRoles } from "@/types/auth";

export interface IUser extends Document {
    username: string;
    password: string;
    role: UserRole;
}

const UserSchema: Schema<IUser> = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: userRoles, required: true, default: "student" },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;