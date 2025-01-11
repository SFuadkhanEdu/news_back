import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
import {
  getAllUsers,
  getUserByID,
  createUser,
  loginUser,
  updateUser,
  deleteUserByID,
  registerUser,
} from "./controllers/user_controller.js";
import {
  createNews,
  deleteNewsByID,
  getAllNews,
  getNewsByID,
  updateNewsByID,
} from "./controllers/news_controller.js";

const app = express();
app.use(json());
app.use(cors());
const port = process.env.PORT || 3000;

app.get("/users", getAllUsers);
app.get("/users/:id", getUserByID);
app.post("/users", createUser);
app.post("/users/register", registerUser);
app.post("/users/login", loginUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUserByID);

app.get("/news", getAllNews);
app.get("/news/:id", getNewsByID);
app.post("/news", createNews);
app.put("/news/:id", updateNewsByID);
app.delete("/news/:id", deleteNewsByID);

app.listen(port, async () => {
  await mongoose
    .connect("mongodb+srv://test:test@test.xf5kk.mongodb.net/")
    .then(() => console.log("connected to DB"))
    .catch((err) => console.log("not conected to DB ", err));

  console.log(`Example app listening on port ${port}`);
});
