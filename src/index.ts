import express from "express";
import http from "http";
import morgan from "morgan";
import router from "./routes";
import { config } from "dotenv";
import { connectToDB } from "./db-connection";
import { handleError } from "./middleware/error-handler";

config();

connectToDB();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

app.use(handleError);

const port = process.env.PORT ? process.env.PORT : 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Node server started on %s port %s ...", new Date(), port);
});
