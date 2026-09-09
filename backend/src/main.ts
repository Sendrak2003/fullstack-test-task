import express from 'express';
import path from 'path';

const app = express();
    const port = Number(process.env.PORT) || 3001;
const publicDir = path.resolve("public");

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.listen(port, () => {
  console.log(`backend listening on http://localhost:${port}`);
});

app.use(express.static(publicDir));
app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});