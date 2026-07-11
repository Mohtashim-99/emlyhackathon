import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, Feast! welcome to youtube channel");
});

import nebula from "./routes/nebula.routes";

app.use("/api/v1/nebula", nebula);

export default app;
