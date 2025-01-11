import { Users } from "../models/user_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const PRIVATE_KEY = "SOME_VERY_SECRET_AND_CLEVER_KEY";

export const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(404).send("USER NOT FOUND");
  }
};
export const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.findById(id);
    console.log(Boolean(users));
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(404).send("USER NOT FOUND");
  }
}; 
export const createUser = async (req, res) => {
  try {
    const body = req.body;
    const isUserExists = await Users.exists({ email: body.email });
    if (isUserExists) {
      res.status(500).send({ msg: "ALREADY EXISTS SUCH USER" });
      return;
    }
    console.log(body.password);
    body.password = await bcrypt.hash(body.password, 10);
    const users = await Users.create(body);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "COULDN'T CREATE USER" });
  }
};
export const registerUser = async (req, res) => {
  try {
    const body = req.body;
    const isUserExists = await Users.exists({ email: body.email });
    if (isUserExists) {
      res.status(500).send({ msg: "ALREADY EXISTS SUCH USER" });
      return;
    }
    console.log(body.password);
    body.password = await bcrypt.hash(body.password, 10);
    const users = await Users.create(body);
    res.status(200).send({msg:"Registered Successfully"});
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "COULDN'T REQISTER USER" });
  }
};
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExists = await Users.findOne({ email });
    console.log(isUserExists);

    if (!isUserExists) {
      res.status(403).send({ msg: "WRONG USERNAME OR PASSWORD" });
      return;
    }
    console.log("DB: ", isUserExists.password);
    console.log("PASS: ", password);

    const isPasswordTrue = await bcrypt.compare(
      password,
      isUserExists.password
    );
    if (!isPasswordTrue) {
      res.status(403).send({ msg: "WRONG USERNAME OR PASSWORD" });
      return;
    }

    const token_body = { role: isUserExists.role };
    const token = jwt.sign(token_body, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 24 //expires in 24 day
    });

    res.status(200).send({ msg: "Welcome", token: token });
    return;
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "COULDN'T LOGIN USER" });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const users = await Users.findByIdAndUpdate(id, body);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "COULDN'T UPDATE" });
  }
};
export const deleteUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.findByIdAndDelete(id);
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "COULDN'T DELETE" });
  }
};
