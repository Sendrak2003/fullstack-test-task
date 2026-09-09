import express from "express";
import { getAvailablePage } from "../../application/get-available-page.js";
import { getSelectedPage } from "../../application/get-selected-page.js";
import { reorderSelected } from "../../application/reorder.js";
import { enqueueAdd } from "../../infrastructure/add-queue.js";
import { enqueueSelection } from "../../infrastructure/selection-queue.js";

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

apiRouter.post("/selection", express.json(), (req, res) => {
  const { id, action } = req.body ?? {};
  if (action !== "select" && action !== "deselect") {
    res.status(400).json({ error: "Unknown action" });
    return;
  }
  enqueueSelection(Number(id), action);
  res.json({ queued: true });
});

apiRouter.post("/order", express.json(), (req, res) => {
  const { movedId, afterId } = req.body ?? {};
  const result = reorderSelected({
    movedId: Number(movedId),
    afterId: afterId == null ? null : Number(afterId),
  });
  res.status("error" in result ? 400 : 200).json(result);
});
