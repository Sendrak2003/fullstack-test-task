import express from "express";
import { getAvailablePage } from "../../application/get-available-page.js";
import { getSelectedPage } from "../../application/get-selected-page.js";
import { enqueueAdd } from "../../infrastructure/add-queue.js";

export const apiRouter = express.Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ ok: true });
});

apiRouter.get("/items", (req, res) => {
  const cursor = Number(req.query.cursor ?? 0);
  const limit = Number(req.query.limit ?? 20);
  const q = String(req.query.q ?? "");
  res.json(getAvailablePage({ cursor, limit, q }));
});

apiRouter.get("/selected", (req, res) => {
  const cursor = Number(req.query.cursor ?? 0);
  const limit = Number(req.query.limit ?? 20);
  const q = String(req.query.q ?? "");
  res.json(getSelectedPage({ cursor, limit, q }));
});

apiRouter.post("/add", express.json(), (req, res) => {
  const id = Number(req.body?.id);
  if (Number.isInteger(id)) enqueueAdd([id]);
  res.json({ queued: true });
});
