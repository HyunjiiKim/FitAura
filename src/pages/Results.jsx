// pages/Result.jsx
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Result() {
  const { state } = useLocation();          // what Home sent via navigate()
  const navigate   = useNavigate();

  // Guard — if someone refreshes /result without data, kick them home
  if (!state || !state.answer) {
    navigate("/");
    return null;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Votre plan personnalisé</h1>

      <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded max-h-[70vh] overflow-y-auto">
        {state.answer}
      </pre>

      <Button label="Revenir à l’accueil" onClick={() => navigate("/")} />
    </div>
  );
}
