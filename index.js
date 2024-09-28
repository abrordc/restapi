import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/route.js";
import Users from "./routes/auth.js";
const app = express();

dotenv.config();

// midleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.URL_DB_CONNECTION);
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("we're connected!");
});

app.use("/api/v1/user", router);
app.use("/api/v1/user", Users);

app.listen(process.env.PORT, () => {
  console.log(`server berjalan di http://localhost:${process.env.PORT}`);
});
