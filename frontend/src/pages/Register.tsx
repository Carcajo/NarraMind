import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("token", "mock-token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form
        onSubmit={handleRegister}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-80 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4 text-white">Регистрация</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl font-semibold"
        >
          Зарегистрироваться
        </button>
        <p className="text-center text-sm mt-4 text-indigo-400">
          Уже есть аккаунт?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer hover:underline"
          >
            Войти
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
