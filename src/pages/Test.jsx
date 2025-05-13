import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";

import { buildNutritionCoachPrompt } from "../functions/buildNutritionCoachPrompt";
import Input, { InputRadio }  from "../components/Input";
import Button from "../components/Button";
import Loader from "../components/Loader";
import LogoGray from "../components/Logo";

const STEPS = ["personal", "goal", "diet", "schedule", "review"];

export default function Test({ profile, setProfile }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [loading,   setLoading]   = useState(false);
  const nav = useNavigate();

  const step = STEPS[stepIndex];

  /* ---------- generic field handlers ---------------------------------- */
  const handle = (field) => (e) => {
    const val =
      e.target.type === "number"   ? Number(e.target.value) :
      e.target.type === "checkbox" ? e.target.checked       :
      e.target.value;

    setProfile((p) => ({ ...p, [field]: val }));
  };

  const handleList = (field) => (e) => {
    const list = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setProfile((p) => ({ ...p, [field]: list }));
  };

  /* ---------- call Gemini via @google/genai --------------------------- */
  async function generatePlan() {
    const apiKey = import.meta.env.VITE_GENAPI;
    if (!apiKey) {
      alert("Ajoutez VITE_GENAPI dans votre fichier .env");
      return;
    }

    setLoading(true);
    try {
      const prompt = buildNutritionCoachPrompt(profile);

      /* Initialise the SDK */
      const ai = new GoogleGenAI({ apiKey });         // browser-safe preview
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt
      });

      /* .text is a string in Node, a function in browser builds — handle both */
      const answer =
        typeof response.text === "function" ? response.text() : response.text;

      nav("/results", { state: { answer } });
    } catch (err) {
      alert("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  }

  /* ---------- UI ------------------------------------------------------ */
  return (
    <div className="relative">
      <div className="bg-white/25 w-screen h-screen absolute top-0 right-0 pointer-events-none" />
      <div className="p-4">
           {step === "personal" && (
        <form
          className="mt-20 flex flex-col gap-10 w-full z-10 justify-center items-center"
          onSubmit={(e) => { e.preventDefault(); setStepIndex(1); }}
        >
          <LogoGray
            title="Information personnelles"
            description="Dites-nous un peu plus sur vous pour que l’on puisse analyser votre profil sportif."
            />
          <div className="flex gap-4">
            <InputRadio
              id="sex-male"
              name="sex"
              value="male"
              label="Homme"
              checked={profile.sex === "male"}
              onChange={handle("sex")}
            />

            <InputRadio
              id="sex-female"
              name="sex"
              value="female"
              label="Femme"
              checked={profile.sex === "female"}
              onChange={handle("sex")}
            />
          </div>

          <Input placeholder="Âge (années)"  type="number" value={profile.age    || ""} onChange={handle("age")} min={1930} max={2025} />
          <Input placeholder="Taille (cm)"   type="number" value={profile.height || ""} onChange={handle("height")} />
          <Input placeholder="Poids (kg)"    type="number" value={profile.weight || ""} onChange={handle("weight")} />

          <Button type="submit" label="Suivant" />
        </form>
      )}

      {/* ---------------- step 2 ---------------- */}
      {step === "goal" && (
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={(e) => { e.preventDefault(); setStepIndex(2); }}
        >
          <h1 className="text-2xl font-bold">2 / 5 — Objectifs</h1>

          <Input placeholder="Poids cible (kg)"        type="number" value={profile.goalWeight        || ""} onChange={handle("goalWeight")} />
          <Input placeholder="Durée du plan (jours)"   type="number" value={profile.mealPlanDuration  || ""} onChange={handle("mealPlanDuration")} />

          <div className="flex justify-between">
            <Button type="button" label="Retour" onClick={() => setStepIndex(0)} />
            <Button type="submit"  label="Suivant" />
          </div>
        </form>
      )}

      {/* ---------------- step 3 ---------------- */}
      {step === "diet" && (
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={(e) => { e.preventDefault(); setStepIndex(3); }}
        >
          <h1 className="text-2xl font-bold">3 / 5 — Préférences alimentaires</h1>

          <Input placeholder="Type de régime (ex. végétarien)"
                 value={profile.dietType || ""} onChange={handle("dietType")} />

          <Input placeholder="Allergies (séparées par des virgules)"
                 value={profile.allergies?.join(", ") || ""}
                 onChange={handleList("allergies")} />

          <Input placeholder="Intolérances (séparées par des virgules)"
                 value={profile.intolerances?.join(", ") || ""}
                 onChange={handleList("intolerances")} />

          <Input placeholder="Je n’aime pas… (séparées par des virgules)"
                 value={profile.dislikes?.join(", ") || ""}
                 onChange={handleList("dislikes")} />

          <div className="flex justify-between">
            <Button type="button" label="Retour" onClick={() => setStepIndex(1)} />
            <Button type="submit"  label="Suivant" />
          </div>
        </form>
      )}

      {/* ---------------- step 4 ---------------- */}
      {step === "schedule" && (
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={(e) => { e.preventDefault(); setStepIndex(4); }}
        >
          <h1 className="text-2xl font-bold">4 / 5 — Organisation & budget</h1>

          <Input placeholder="Repas / jour" type="number"
                 value={profile.mealsPerDay || ""} onChange={handle("mealsPerDay")} />

          <label className="flex gap-2 items-center">
            <input type="checkbox"
                   checked={profile.mealPrep}
                   onChange={handle("mealPrep")} />
            Je peux faire du meal-prep / batch-cooking
          </label>

          <Input placeholder="Budget € / jour" type="number"
                 value={profile.budget || ""} onChange={handle("budget")} />

          <Input placeholder="Cuisine préférée"
                 value={profile.cuisine || ""} onChange={handle("cuisine")} />

          <div className="flex justify-between">
            <Button type="button" label="Retour" onClick={() => setStepIndex(2)} />
            <Button type="submit"  label="Suivant" />
          </div>
        </form>
      )}

      {/* ---------------- step 5 ---------------- */}
      {step === "review" && (
        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-2xl font-bold">5 / 5 — Vérification</h1>

          <pre className="bg-gray-50 p-4 rounded text-sm whitespace-pre-wrap max-h-60 overflow-y-auto">
            {JSON.stringify(profile, null, 2)}
          </pre>

          <div className="flex justify-between">
            <Button label="Retour"     onClick={() => setStepIndex(3)} />
            <Button label={loading ? "Génération…" : "Terminer"}
                    disabled={loading}
                    onClick={generatePlan} />
          </div>

          {loading && <Loader className="self-center" />}
        </div>
      )}
      </div>
    </div>
  );
}
