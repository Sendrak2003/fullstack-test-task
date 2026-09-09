import express from "express";
import path from "node:path";
import { apiRouter } from "./api-router.js";

const publicDir = path.resolve("public");

export const app = express();

app.use("/api", apiRouter);

app.use(express.static(publicDir));
app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});
