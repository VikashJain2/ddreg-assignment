import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import { connectDB } from "./config/connectdb.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", userRouter)
app.use("/", taskRouter)

app.listen(port, () => {
  connectDB()
    .then(() => {
      console.log(`Server is running on http://localhost:${port}`);
    })
    .catch((error) => {
      console.log("Error connecting to database", error.message);
      process.exit(1);
    });
});
