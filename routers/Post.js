import express from "express";
import { createPost,allPosts,delPost } from "../authControllers/Post.js";
import protect from "../authMiddleware/Post.js";

const prouter = express.Router();

prouter.get("/",allPosts);
prouter.post("/",protect,createPost);
prouter.delete("/:id",protect,delPost);

export default prouter;