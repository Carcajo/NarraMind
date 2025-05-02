import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/log.png";

const LogoAnimation = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      navigate("/login");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className="flex items-center justify-center h-screen bg-black">
      <img src={logo} alt="NarraMind Logo" className="w-120 animate-pulse" />
    </div>
  ) : null;
};

export default LogoAnimation;
