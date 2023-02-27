import express from "express";
import http from "http";
import morgan from "morgan";
import router from "./routes";
import { config } from "dotenv";
import { connectToDB } from "./db-connection";
import { handleError } from "./middleware/error-handler";
import environMentVariables from "./utils/env-variables";
import headers from "./middleware/headers";

config();

connectToDB();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(headers);

app.use("/api", router);

app.use(handleError);

const port = environMentVariables.getPort();

const server = http.createServer(app);

server.listen(port, () => {
  console.log("Node server started on %s port %s ...", new Date(), port);
});
