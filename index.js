import express, { urlencoded } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
import urouter from "./routers/User.js";
import prouter from "./routers/Post.js";

dotenv.config();

connectToDb();
const app = express();

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(helmet());
app.use(cors({origin:'https://thenet.netlify.app',credentials:true}))
app.use(morgan("dev"));

app.use("/api/auth",urouter);
app.use("/posts/",prouter);

app.get("/",(req,res)=>{
    res.status(200).send("Working fine ✅")
})

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running ✅\nAccess it at http://localhost:${PORT}`);
})
