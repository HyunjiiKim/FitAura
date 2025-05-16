import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Results() {
  const { state }   = useLocation();
  const navigate    = useNavigate();

  if (!state?.answer) {
    navigate("/");
    return null;
  }

  // The structure below follows the JSON expected back from Gemini.
  const answer = state.answer;

  /* ---------- Meal plan --------------------------------------------- */
  const mealPlan = (answer.planRepasHebdomadaire ?? []).map((day) => ({
    name: day.jour,
    items: [
      ...day.petitDejeuner,
      ...day.dejeuner,
      ...day.diner,
    ],
  }));

  /* ---------- Workout plan ------------------------------------------ */
  const workoutPlan = (answer.programmeEntrainement?.joursSpecifiques ?? []).map((w) => ({
    name: w.jour,
    content: w.exercices,
  }));

  const workoutDescription = answer.programmeEntrainement?.descriptionGenerale ?? "";

  /* ---------- Podcasts ---------------------------------------------- */
  const podcastPlan = (answer.podcastsRecommandes ?? []).map((p) => ({
    name: p.nom,
    content: [p.description, `Catégorie : ${p.categorie}`],
  }));

  /* ---------- UI ---------------------------------------------------- */
  return (
    <div className="flex flex-col gap-10 items-center">
      <h1 className="mt-20 text-3xl font-medium flex items-center gap-2">
        <i className="bi bi-stars text-[#A3958F]" /> Votre plan bien-être <i className="bi bi-stars text-[#A3958F]" />
      </h1>

      {/* MEALS */}
      <section className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-medium flex items-center gap-2">
          <i className="bi bi-fork-knife" /> Régime conseillé
        </h2>

        <div>
          {mealPlan.slice(0,1).map((day) => (
            <div key={day.name}>
              <div className="flex gap-2">
                {day.items.map((item, idx) => <div key={idx} className="p-2 w-30 aspect-square flex flex-wrap items-center rounded-full bg-tertiary-1 drop-shadow-2xl"><p className="text-xs">{item}</p></div>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKOUT */}
      <section className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-medium flex items-center gap-2">
          <i className="bi bi-person-walking" /> Entraînement
        </h2>
        {workoutDescription && <p>{workoutDescription}</p>}
        <div className="flex gap-4 flex-wrap justify-center">
          {workoutPlan.map((w) => (
            <div key={w.name} className="flex flex-col items-center justify-center w-80">
              <h3 className="font-semibold mb-2">{w.name}</h3>
              <ul className="bg-tertiary-1 p-4 rounded-xl">
                {w.content.map((ex, idx) => <li key={idx} className="text-xs">{ex}</li>)}
              </ul>
              
            </div>
          ))}
        </div>
      </section>

      {/* PODCASTS */}
      <section className="flex flex-col gap-4 p-4">
        <h2 className="text-xl font-medium flex items-center gap-2">
          <i className="bi bi-headphones" /> Podcasts conseillés
        </h2>
        <div className="flex flex-col gap-4">
          {podcastPlan.map((p) => (
            <div key={p.name} className="bg-tertiary-1 p-4 rounded-xl">
              <h3 className="font-semibold mb-2">{p.name}</h3>
              <ul className="list-disc list-inside space-y-1">
                {p.content.map((c, idx) => <li key={idx} className="text-xs">{c}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <div className="mb-20">
        <span className="text-tertiary-3" onClick={() => navigate("/")}>
          Revenir à l’accueil
        </span>
      </div>
      
    </div>
  );
}
