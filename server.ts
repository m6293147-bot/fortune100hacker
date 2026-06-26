import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("trials.db");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS trials (
    id TEXT PRIMARY KEY,
    count INTEGER DEFAULT 0
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Helper to get client IP
  const getClientIp = (req: express.Request) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
      return (typeof forwarded === 'string' ? forwarded : forwarded[0]).split(',')[0].trim();
    }
    return req.ip || req.socket.remoteAddress || "unknown";
  };

  // API to get trial count
  app.get("/api/trials", (req, res) => {
    const ip = getClientIp(req);
    const uid = req.query.uid as string;

    let ipCount = 0;
    let uidCount = 0;

    const ipRow = db.prepare("SELECT count FROM trials WHERE id = ?").get(ip) as { count: number } | undefined;
    if (ipRow) ipCount = ipRow.count;

    if (uid) {
      const uidRow = db.prepare("SELECT count FROM trials WHERE id = ?").get(uid) as { count: number } | undefined;
      if (uidRow) uidCount = uidRow.count;
    }

    // Return the maximum of the two
    res.json({ count: Math.max(ipCount, uidCount) });
  });

  // API to increment trial count
  app.post("/api/trials/increment", (req, res) => {
    const ip = getClientIp(req);
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({ error: "UID is required" });
    }

    // Increment for IP
    db.prepare(`
      INSERT INTO trials (id, count) VALUES (?, 1)
      ON CONFLICT(id) DO UPDATE SET count = count + 1
    `).run(ip);

    // Increment for UID
    db.prepare(`
      INSERT INTO trials (id, count) VALUES (?, 1)
      ON CONFLICT(id) DO UPDATE SET count = count + 1
    `).run(uid);

    const ipCount = (db.prepare("SELECT count FROM trials WHERE id = ?").get(ip) as { count: number }).count;
    const uidCount = (db.prepare("SELECT count FROM trials WHERE id = ?").get(uid) as { count: number }).count;
    
    res.json({ count: Math.max(ipCount, uidCount) });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
