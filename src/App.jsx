import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home     from "./pages/Home";
import Test     from "./pages/Test";
import Results  from "./pages/Results";

const initialProfile = {
  sex: "",
  age: 0,
  height: 0,
  weight: 0,
  goal: "",
  desiredWeight: 0,
  activityLevel: "",
};

export default function App() {
  const [profile, setProfile] = useState(initialProfile);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/test"   element={<Test profile={profile} setProfile={setProfile} />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
}