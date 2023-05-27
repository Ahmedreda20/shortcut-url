import express from "express";
import type { Request, Response, NextFunction, Application } from "express";
import { createServer } from "http";
import cors from "cors";
import helmet from "helmet";
import ErrorHandler from "./utils/errors/ErrorHandler";
import dotenv from "dotenv";
import db from "./models";
import router from "./routes";
import ApiError from "./utils/errors/ApiError";
import path from "path";
dotenv.config();

const port = process.env.PORT || 5000;
const app: Application = express();
const server = createServer(app);

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(router);
app.use("*", (req, res, next) => {
  throw new ApiError("NOT_FOUND", undefined);
});

app.use(ErrorHandler);

async function connection() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync({ force: false });
    console.log("server running..");
    console.log("database connected..");
  } catch (error) {
    server.close();
    console.log("server closed!!");
    console.log("server error => ", error);
  }
}

server.listen(port, connection);
