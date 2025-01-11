import mongoose from "mongoose";
const today = new Date;
const todayDate = today.toISOString().split('T')[0]
export const News = mongoose.model("News", {
    header: { type: String, required: true },
    date: { type: String, default: todayDate},
    category: { type: String, required: true },
    content: { type: String, required: true },
  });