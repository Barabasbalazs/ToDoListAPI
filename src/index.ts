import express from "express";
import http from "http";
import morgan from "morgan";
import router from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const port = 8080;

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Node server started on %s port %s ...", new Date(), port);
});
