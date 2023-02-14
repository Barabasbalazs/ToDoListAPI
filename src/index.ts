import express from "express";
import http from "http";
import morgan from "morgan";
import router from "./routes";
import { connectToDB } from "./db-connection";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

connectToDB();

const port = 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Node server started on %s port %s ...", new Date(), port);
});
