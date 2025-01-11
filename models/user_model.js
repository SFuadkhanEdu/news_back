import mongoose from "mongoose";
export const Users = mongoose.model("Users", {
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" },
});