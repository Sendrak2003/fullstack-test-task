import { app } from "./interface/http/app.js";
import "./infrastructure/add-queue.js";

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
  console.log(`backend listening on http://localhost:${port}`);
});
