import express from "express";
import http from "http";
import morgan from "morgan";
import router from "./routes";
import { config } from "dotenv";
import { connectToDB } from "./db-connection";

config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);

//error middleware here

const port = process.env.PORT;

connectToDB();

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Node server started on %s port %s ...", new Date(), port);
});
