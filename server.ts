import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Simple in-memory rate limiter: max 10 requests per minute per IP
const rateLimitStore = new Map<string, number[]>();
function rateLimit(ip: string, maxRequests = 10, windowMs = 60_000): boolean {
  const now = Date.now();
  const timestamps = (rateLimitStore.get(ip) || []).filter(t => now - t < windowMs);
  rateLimitStore.set(ip, timestamps);
  if (timestamps.length >= maxRequests) return false;
  timestamps.push(now);
  return true;
}

const MAX_MESSAGES = 30;
const MAX_MESSAGE_LENGTH = 2000;

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50kb" }));

  // API routes FIRST
  app.post("/api/chat", async (req, res) => {
    try {
      const ip = req.ip || req.socket.remoteAddress || 'unknown';
      if (!rateLimit(ip)) {
        return res.status(429).json({ error: "Too many requests. Please wait a moment and try again." });
      }

      const { messages } = req.body;
      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({ error: "Invalid messages format" });
      }
      if (messages.length > MAX_MESSAGES) {
        return res.status(400).json({ error: `Too many messages. Maximum is ${MAX_MESSAGES}.` });
      }
      for (const msg of messages) {
        if (msg.role !== 'user' && msg.role !== 'model') {
          return res.status(400).json({ error: "Invalid message role" });
        }
        if (!msg.parts?.[0]?.text || typeof msg.parts[0].text !== 'string') {
          return res.status(400).json({ error: "Invalid message content" });
        }
        if (msg.parts[0].text.length > MAX_MESSAGE_LENGTH) {
          return res.status(400).json({ error: `Message too long. Maximum is ${MAX_MESSAGE_LENGTH} characters.` });
        }
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is missing" });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `You are the Sains Restaurant assistant chatbot. 
You are helpful, polite, and can answer questions about the restaurant's menu, hours, location, and reservations.
The restaurant is located at Uhuru St, Eldoret, Kenya.
Operating Hours: Mon - Sat: 11:00 - 23:00, Sun: Closed.
Phone: 0722 699910.
If asked about things outside of the restaurant, politely decline and steer the conversation back to Sains Restaurant. Keep your answers concise and friendly.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: messages,
        config: {
          systemInstruction,
        }
      });

      res.json({ text: response.text });
    } catch (error) {
      console.error("Error in /api/chat:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // In express 4, it is *
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
