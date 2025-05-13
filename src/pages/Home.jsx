import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

// components
import Button from "../components/Button";
import Loader from "../components/Loader";

export default function Home() {
  const apiKey = import.meta.env.VITE_GENAPI;
  const [promptInfo, setPromptInfo] = useState({
    sex:"",
    age: 0,
    height: 0,
    weight: 0,
    goalWeight: 0,
    activityLevel: 0,
    dietType:"",
    allergies: [],
    intolerances: [],
    dislikes:[],
    likes:[],
    mealsPerDay: 0,
    mealPrep: false,
    budget: 0,
    cuisine:"",
    cookingSkill:0,
    dietaryRestrictions:[],
    mealPlanDuration:0,
    mealPlanStartDate:"",
    mealPlanEndDate:"",
  });
  const [prompt, setPrompt]   = useState("");
  const [answer, setAnswer]   = useState("");
  const [loading, setLoading] = useState(false);

  // Speech synthesis
  const synth = window.speechSynthesis;
  const [synthesizing, setSynthesizing] = useState(false);
  const [synthError, setSynthError] = useState(false);
  const [synthText, setSynthText] = useState("");
  const [synthVoice, setSynthVoice] = useState(null);
  const [synthRate, setSynthRate] = useState(1);
  const [synthPitch, setSynthPitch] = useState(1);
  const [synthVolume, setSynthVolume] = useState(1);


  async function ask(e) {
    e.preventDefault();
    if (!apiKey) return console.log("Paste API key first!");
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
    <div>
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <h1 className="text-2xl font-bold text-center">FitAura</h1>
        <h2 className="text-lg text-center">Votre assistant personnel de nutrition</h2>
        <Button label="Commencer" custom="w-full" onClick={()=>window.location.href="/test"} />
      </div>
      {/*
      <div>
      {answer && (
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded">{answer}</pre>
      )}
      </div>
      <form onSubmit={ask} className="flex gap-4">
        <textarea
          required
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          className="w-full h-fit border rounded p-2"
          placeholder="Quel régime alimentaire voulez-vous ?"
        />
        <Button
            label={loading ? "Réfléchir..." : "Soumettre"}
            disabled={loading}
        />
      </form>
      {loading && (
        <Loader />
      )}
      */}
    </div>
  );
}

