import express from "express";
import { registerUser,loginUser,getUserDetails } from "../authControllers/User.js"; "../authControllers/User.js";
import protect from "../authMiddleware/Post.js";

const urouter = express.Router();

urouter.post("/register",registerUser);
urouter.post("/login",loginUser);
urouter.get("/me",protect,getUserDetails);

export default urouter;