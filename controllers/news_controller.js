import { News } from "../models/news_model.js";

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "NOT FOUND" });
  }
};
export const getNewsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findById(id);
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "NOT FOUND" });
  }
};
export const createNews = async (req, res) => {
  try {
    const body = req.body;
    const news = await News.create(body);
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "COULDN'T CREATE" });
  }
};
export const updateNewsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const news = await News.findByIdAndUpdate(id, body);
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "COULDN'T UPDATE" });
  }
};
export const deleteNewsByID = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    res.status(200).send(news);
  } catch (error) {
    console.log(error);
    res.status(404).send({ msg: "COULDN'T DELETE" });
  }
};
