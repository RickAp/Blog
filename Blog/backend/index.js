import express from "express";
import { connectionToDB } from "./db.js";
import router from "./routes/auth.routes.js";
import postsRoutes from "./routes/posts.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = 4000;
connectionToDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use("/api", postsRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});