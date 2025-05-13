export function buildNutritionCoachPrompt(profile) {
    const list = (arr) => (arr && arr.length ? arr.join(", ") : "none");
  
    return `
  You are a certified nutritionist and strength-and-conditioning coach.
  Read the profile below and return:
  
  • A ${profile.mealPlanDuration}-day meal plan (breakfast, lunch, dinner, snacks)  
    – calories & macros per meal  
    – one consolidated grocery list for the whole plan  
  • A progressive workout schedule (strength + cardio) for the same duration  
  • All advice MUST respect allergies, intolerances, dislikes, dietary restrictions, budget and cooking skill.
  
  ---  USER PROFILE  ---
  Sex: ${profile.sex || "unspecified"}
  Age: ${profile.age}
  Height: ${profile.height} cm
  Current weight: ${profile.weight} kg
  Goal weight: ${profile.goalWeight} kg
  
  Physical-activity level (0 sedentary → 4 athlete): ${profile.activityLevel}
  Diet type: ${profile.dietType || "unspecified"}
  
  Allergies: ${list(profile.allergies)}
  Intolerances: ${list(profile.intolerances)}
  Dislikes: ${list(profile.dislikes)}
  Likes: ${list(profile.likes)}
  
  Meals per day: ${profile.mealsPerDay}
  OK with batch cooking / meal-prep?: ${profile.mealPrep ? "yes" : "no"}
  
  Budget: €${profile.budget} per day
  Preferred cuisine(s): ${profile.cuisine || "none"}
  Cooking skill (0 novice → 3 advanced): ${profile.cookingSkill}
  
  Dietary restrictions: ${list(profile.dietaryRestrictions)}
  
  Plan duration: ${profile.mealPlanDuration} days
  Start date: ${profile.mealPlanStartDate || "open"}
  End date: ${profile.mealPlanEndDate || "open"}
  ------------------------
  
  ❗ Return two top-level keys: “mealPlan” and “workoutPlan” in french.
  Each should contain an array of daily objects.`;
  }
  