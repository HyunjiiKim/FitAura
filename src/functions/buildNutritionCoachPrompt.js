// src/functions/buildNutritionCoachPrompt.js
/**
 * Returns ONE string prompt ready for model.generateContent().
 * We keep all “system-style” instructions at the top, then add the user profile.
 */
export function buildNutritionCoachPrompt(profile) {
  return `
Tu es un coach de nutrition et de sport.
Réponds toujours en JSON strict — aucun texte avant ou après.
Clés attendues : planRepasHebdomadaire, programmeEntrainement, podcastsRecommandes.

Exemple minimal :
{
  "planRepasHebdomadaire": [
    { "jour": "Lundi", "petitDejeuner": ["…"], "dejeuner": ["…"], "diner": ["…"] }
  ],
  "programmeEntrainement": {
    "descriptionGenerale": "…",
    "joursSpecifiques": [
      { "jour": "Lundi", "exercices": ["…"] }
    ]
  },
  "podcastsRecommandes": [
    { "nom": "…", "categorie": "…", "description": "…" }
  ]
}

Profil de l’utilisateur :
${JSON.stringify(profile, null, 2)}

Crée-lui un plan complet conforme aux clés demandées.
`.trim();
}
