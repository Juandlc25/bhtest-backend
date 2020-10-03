import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import rou from "./routes/userRouter.js";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = 9000 || process.env.PORT;

mongoose.connect(
  process.env.MONGODB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    console.log("MongoDB connection its working");
  }
);

// Api endpoints
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});

app.use("/users", rou);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.listen(port, () => {
  console.log(`server up and running on ${port}`);
});
