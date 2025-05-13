import { useNavigate } from "react-router-dom";

import Background from "../components/Bg";
import Button from "../components/Button";

import Logo from "../assets/img/LogoText.png"

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <Background />
      <div className="z-10">
        <div id="logoContainer" className="relative">
          <img src={Logo} alt="Futaura"/>
          <p className="text-white absolute bottom-0">Your Fitness. Your Formula.</p>
        </div>
        <Button
          label="Commencer"
          intent="white"
          custom="w-full text-tertiary-3 mt-8"
          onClick={() => navigate("/test")}
  
        />
      </div>
    </div>
  );
}
