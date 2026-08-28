import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
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

      // Format messages for the Gemini API
      // We expect messages to be in the form { role: 'user' | 'model', parts: [{ text: string }] }
      // The frontend should send them formatted correctly.

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
