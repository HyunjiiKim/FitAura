import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

// components
import Button from "../components/Button";

export default function Home() {
  const apiKey = import.meta.env.VITE_GENAPI;
  const [prompt, setPrompt]   = useState("");
  const [answer, setAnswer]   = useState("");
  const [loading, setLoading] = useState(false);


  async function ask(e) {
    e.preventDefault();
    if (!apiKey) return alert("Paste your OpenAI API key first!");
    setLoading(true); 
    setAnswer("");
    try {
      const genai = new GoogleGenAI({
        apiKey,
        dangerouslyAllowBrowser: true, 
      });

      const res = await genai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt.trim(),
      });

      const output =
      res.text ??
      res.candidates?.[0]?.content?.parts?.map(p => p.text).join("") ??
      `No text returned (finish reason: ${res.candidates?.[0]?.finishReason || res.promptFeedback?.blockReason || "unknown"})`;

        setAnswer(output || "(empty)");
    } catch (err) {
      setAnswer("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-4">
        {answer && (
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">{answer}</pre>
      )}
      <form onSubmit={ask} className="flex gap-4">
        <textarea
          required
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full h-14 border rounded p-2"
          placeholder="Quel régime alimentaire voulez-vous ?"
        />
        <Button
            label={loading ? "Réfléchir..." : "Soumettre"}
            disabled={loading}
        />
      </form>
    </div>
  );
}

