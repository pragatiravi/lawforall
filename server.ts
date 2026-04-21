import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Mock Law Data
  const laws = [
    {
      id: "fundamental-rights",
      title: {
        en: "Fundamental Rights (Articles 12-35)",
        hi: "मौलिक अधिकार (अनुच्छेद 12-35)",
        kn: "ಮೂಲಭೂತ ಹಕ್ಕುಗಳು (ವಿಧಿಗಳು 12-35)"
      },
      category: "constitution",
      content: {
        en: {
          about: "Fundamental Rights are the basic human rights of all citizens.",
          reference: "Part III of the Constitution of India",
          rights: ["Right to Equality", "Right to Freedom", "Right against Exploitation"],
          authorities_allowed: ["Enforce reasonable restrictions for public order"],
          authorities_not_allowed: ["Violate basic structure of rights"],
          scenario: "A citizen is denied entry to a public park based on their religion.",
          explanation: "This is a violation of Article 15.",
          todo: "Approach the High Court or Supreme Court.",
          not_todo: "Do not resort to violence."
        }
      }
    }
  ];

  app.get("/api/laws", (req, res) => {
    res.json(laws);
  });

  app.get("/api/lawyers", (req, res) => {
    res.json([
      { id: 1, name: "Adv. Rajesh Kumar", specialization: "Criminal Law", city: "New Delhi", contact: "rajesh@example.com" },
      { id: 2, name: "Adv. Priya Sharma", specialization: "Women's Rights", city: "Mumbai", contact: "priya@example.com" },
      { id: 3, name: "Adv. Suresh Hegde", specialization: "Civil Law", city: "Bengaluru", contact: "suresh@example.com" }
    ]);
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
