import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Chat = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState<string[]>([
    "Первый сценарий",
    "История о приключении",
    "Загадка будущего"
  ]);
  const [messages, setMessages] = useState<string[]>([]);

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      try {
        const response = await fetch("/api/v1/chat/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ message: prompt })
        });

        if (!response.ok) {
          throw new Error("Ошибка сервера");
        }

        const data = await response.json();
        const reply = data.response;

        setMessages((prev) => [...prev, `Вы: ${prompt}`, `Бот: ${reply}`]);
        setPrompt("");
      } catch (error) {
        console.error("Ошибка при отправке запроса:", error);
      }
    }
  };

  return (
    <div className="h-screen flex text-white bg-gray-900 font-sans">
      {/* Список чатов слева */}
      <aside className="w-64 border-r border-gray-700 p-4 flex flex-col">
        <button
          className="mb-4 bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-lg"
          onClick={() => setChats([...chats, `Новый сценарий ${chats.length + 1}`])}
        >
          + Новый чат
        </button>
        <ul className="space-y-2 overflow-auto">
          {chats.map((chat, index) => (
            <li
              key={index}
              className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
            >
              {chat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Основная часть чата */}
      <main className="flex-1 flex flex-col justify-between">
        <div className="p-6 space-y-2 overflow-auto">
          <h1 className="text-xl font-bold mb-4">Чат</h1>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.startsWith("Вы:")
                  ? "bg-gray-700 text-right"
                  : "bg-gray-800 text-left"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>

        <form
          onSubmit={handlePromptSubmit}
          className="w-full p-4 bg-gray-800 border-t border-gray-700 flex justify-center"
        >
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Напиши свой промт..."
            className="w-3/4 p-3 rounded-xl bg-gray-700 text-white focus:outline-none"
          />
          <button
            type="submit"
            className="ml-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl"
          >
            Отправить
          </button>
        </form>
      </main>

      {/* Кнопки справа */}
      <aside className="w-40 border-l border-gray-700 p-4 flex flex-col items-end gap-4">
        <button
          onClick={() => navigate("/favorites")}
          className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-3 rounded-lg"
        >
          ❤️ Избранное
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="bg-gray-800 hover:bg-gray-700 text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          <span className="text-sm">👤</span>
        </button>
      </aside>
    </div>
  );
};

export default Chat;
