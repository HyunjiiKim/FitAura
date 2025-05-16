import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { buildNutritionCoachPrompt } from "../functions/buildNutritionCoachPrompt";
import Input, { InputRadio, InputSelect } from "../components/Input";
import Button  from "../components/Button";
import Loader  from "../components/Loader";
import LogoGray from "../components/Logo";

const STEPS = ["personal", "goal", "goal2"];

export default function Test({ profile, setProfile }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [loading,   setLoading]   = useState(false);
  const navigate = useNavigate();

  const step = STEPS[stepIndex];

  /* ---------- generic field handlers ------------------------------- */
  const handle = (field) => (e) => {
    const val = (() => {
      switch (e.target.type) {
        case "number":
          return Number(e.target.value);
        case "checkbox":
          return e.target.checked;
        case "radio":
          return e.target.value;
        case "select-one":
          return e.target.value;
        default:
          return e.target.value;
      }
    })();
    setProfile((p) => ({ ...p, [field]: val }));
  };

  async function generatePlan() {
    const apiKeyRaw = import.meta.env.VITE_GENAPI ?? "";
    const apiKey    = apiKeyRaw.trim();
  
    if (!apiKey) {
      alert(
        "Votre clé Gemini n'est pas définie.\n" +
        "Ajoutez VITE_GENAPI=... dans un fichier .env à la racine, puis redémarrez Vite."
      );
      return;
    }
  
    setLoading(true);
    try {
      /* 1️⃣ Build ONE plain-text prompt */
      const prompt = buildNutritionCoachPrompt(profile);
  
      /* 2️⃣ Call Gemini */
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
      const result  = await model.generateContent(prompt);
      const rawText = result.response.text();
  
      /* 3️⃣ Extract the JSON string the model returned */
      const clean = rawText
      .trim()
      .replace(/^```(?:json)?\s*/i, "")  // opening fence
      .replace(/\s*```$/, "");           // closing fence

        const json = JSON.parse(clean);
  
      navigate("/results", { state: { answer: json } });
    } catch (err) {
      alert("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  }
  /* ---------- UI --------------------------------------------------- */
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50">
          <Loader />
        </div>
      )}

      <div className="p-4">
        {/* STEP 1 – personal ------------------------------------------------ */}
        {step === "personal" && (
          <form
            className="mt-20 flex flex-col gap-10 items-center"
            onSubmit={(e) => { e.preventDefault(); setStepIndex(1); }}
          >
            <LogoGray
              title="Informations personnelles"
              description="Dites-nous un peu plus sur vous pour que l’on puisse analyser votre profil sportif."
            />

            <div className="flex gap-4">
              <InputRadio id="sex-female" name="sex" value="female" label="Femme"
                          checked={profile.sex === "female"} onChange={handle("sex")} />
              <InputRadio id="sex-male"   name="sex" value="male"   label="Homme"
                          checked={profile.sex === "male"}   onChange={handle("sex")} />
            </div>

            <Input placeholder="Âge"          type="number" value={profile.age || ""}     onChange={handle("age")}     min={1} max={120} />
            <Input placeholder="Taille (cm)"  type="number" value={profile.height || ""}  onChange={handle("height")} />
            <Input placeholder="Poids (kg)"   type="number" value={profile.weight || ""}  onChange={handle("weight")} />

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" label="Suivant" />
              <span className="text-tertiary-3 cursor-pointer" onClick={() => navigate("/")}>Retour</span>
            </div>
          </form>
        )}

        {/* STEP 2 – goal ---------------------------------------------------- */}
        {step === "goal" && (
          <form
            className="mt-20 flex flex-col gap-10 items-center"
            onSubmit={(e) => { e.preventDefault(); setStepIndex(2); }}
          >
            <LogoGray
              title="Vos objectifs"
              description="Sélectionnez ceux qui comptent le plus pour vous."
            />

            <div className="flex flex-col gap-2">
              {[
                { id: "fitness-improve", label: "Améliorer la forme"  },
                { id: "weight-loss",     label: "Perdre du poids"    },
                { id: "muscle-gain",     label: "Gagner du muscle"   },
                { id: "stress-reduce",   label: "Réduire le stress"  },
                { id: "resume-sport",    label: "Reprendre le sport" },
                { id: "endurance-improve", label: "Améliorer l'endurance" },
              ].map(({ id, label }) => (
                <InputRadio
                  key={id}
                  id={`goal-${id}`}
                  name="goal"
                  value={id}
                  label={label}
                  checked={profile.goal === id}
                  onChange={handle("goal")}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" label="Suivant" />
              <span className="text-tertiary-3 cursor-pointer" onClick={() => setStepIndex(0)}>Retour</span>
            </div>
          </form>
        )}

        {/* STEP 3 – goal details ------------------------------------------- */}
        {step === "goal2" && (
          <form
            className="mt-20 flex flex-col gap-10 items-center"
            onSubmit={(e) => { e.preventDefault(); generatePlan(); }}
          >
            <LogoGray
              title="Détails supplémentaires"
              description="Indiquez votre objectif de poids et votre activité."
            />

            <Input
              placeholder="Poids souhaité (kg)"
              type="number"
              value={profile.desiredWeight || ""}
              onChange={handle("desiredWeight")}
            />

            <InputSelect
              placeholder="Niveau d'activité"
              value={profile.activityLevel || ""}
              onChange={handle("activityLevel")}
              options={[
                { value: "sedentary",         label: "Sédentaire" },
                { value: "lightly-active",    label: "Légèrement actif" },
                { value: "moderately-active", label: "Modérément actif" },
                { value: "very-active",       label: "Très actif" },
                { value: "super-active",      label: "Athlète" },
              ]}
            />

            <div className="flex flex-col items-center gap-4">
              <Button type="submit" label="Générer mon plan" />
              <span className="text-tertiary-3 cursor-pointer" onClick={() => setStepIndex(1)}>Retour</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
