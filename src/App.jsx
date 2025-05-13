// App.jsx
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home    from "./pages/Home";
import Test    from "./pages/Test";
import Results from "./pages/Results";

const initialProfile = {
  sex: "",
  age: 0,
  height: 0,
  weight: 0,
  goalWeight: 0,
  activityLevel: 0,
  dietType: "",
  allergies: [],
  intolerances: [],
  dislikes: [],
  likes: [],
  mealsPerDay: 0,
  mealPrep: false,
  budget: 0,
  cuisine: "",
  cookingSkill: 0,
  dietaryRestrictions: [],
  mealPlanDuration: 0,
  mealPlanStartDate: "",
  mealPlanEndDate: ""
};

export default function App() {
  const [profile, setProfile] = useState(initialProfile);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home profile={profile} setProfile={setProfile} />}
        />
        <Route
          path="/test"
          element={<Test profile={profile} setProfile={setProfile} />}
        />
        <Route
          path="/results"
          element={<Results />}
        />
      </Routes>
    </BrowserRouter>
  );
}
