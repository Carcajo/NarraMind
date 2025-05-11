import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Chat = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string>("default");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<{
    id: string;
    title: string;
    messages: { role: "user" | "assistant"; content: string }[];
  }[]>([
    {
      id: "default",
      title: "Новый сценарий",
      messages: []
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const currentChat = chats.find((chat) => chat.id === currentChatId) || chats[0];

  const createNewChat = () => {
    const newChatId = `chat_${Date.now()}`;
    setChats([
      ...chats,
      {
        id: newChatId,
        title: `Новый сценарий ${chats.length + 1}`,
        messages: []
      }
    ]);
    setCurrentChatId(newChatId);
  };

  const switchChat = (chatId: string) => {
    setCurrentChatId(chatId);
  };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);

    const updatedChats = chats.map(chat =>
      chat.id === currentChatId
        ? {
            ...chat,
            messages: [...chat.messages, { role: "user", content: prompt }]
          }
        : chat
    );
    setChats(updatedChats);

    try {
      const response = await fetch("http://localhost:8000/api/v1/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: prompt })
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера: ${response.status}`);
      }

      const data = await response.json();

      const chatsWithResponse = updatedChats.map(chat =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                { role: "assistant", content: data.response }
              ]
            }
          : chat
      );

      setChats(chatsWithResponse);

      if (currentChat.messages.length === 0) {
        const titleFromPrompt = prompt.split(' ').slice(0, 4).join(' ') + '...';
        const chatsWithTitle = chatsWithResponse.map(chat =>
          chat.id === currentChatId ? { ...chat, title: titleFromPrompt } : chat
        );
        setChats(chatsWithTitle);
      }
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      const chatsWithError = updatedChats.map(chat =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  role: "assistant",
                  content: "Извините, произошла ошибка при обработке запроса. Пожалуйста, попробуйте еще раз."
                }
              ]
            }
          : chat
      );
      setChats(chatsWithError);
    } finally {
      setPrompt("");
      setIsLoading(false);
    }
  };

  const formatScriptResponse = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('Название:') || line.match(/^Название:/i)) {
        return <h3 key={index} className="font-bold text-lg mt-2">{line}</h3>;
      } else if (line.match(/^Кадр \d+:/i)) {
        return <h4 key={index} className="font-semibold text-md mt-2 text-yellow-300">{line}</h4>;
      } else if (line.match(/^Текст на экране:|^Голос за кадром:/i)) {
        return <p key={index} className="pl-4 italic text-blue-300">{line}</p>;
      } else {
        return <p key={index} className="pl-2">{line}</p>;
      }
    });
  };

  return (
    <div className="h-screen flex text-white bg-gray-900 font-sans">
      <aside className="w-64 border-r border-gray-700 p-4 flex flex-col">
        <button
          className="mb-4 bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-lg"
          onClick={createNewChat}
        >
          + Новый чат
        </button>
        <ul className="space-y-2 overflow-auto">
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 rounded-lg cursor-pointer ${
                chat.id === currentChatId
                  ? "bg-indigo-600"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              onClick={() => switchChat(chat.id)}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 flex flex-col justify-between">
        <div className="p-6 space-y-4 overflow-auto">
          {currentChat.messages.length === 0 ? (
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold mb-4">NarraMind</h1>
              <p className="text-gray-300 mb-2">
                Опишите продукт или услугу, целевую аудиторию и цель рекламы.
              </p>
              <p className="text-gray-400">
                Например: "Создай сценарий для TikTok о кулинарных мастер-классах для молодых мам"
              </p>
            </div>
          ) : (
            currentChat.messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  msg.role === "user"
                    ? "bg-gray-700 text-left border-l-4 border-indigo-500"
                    : "bg-gray-800 text-left border-l-4 border-green-500"
                }`}
              >
                <p className="text-xs text-gray-400 mb-1">
                  {msg.role === "user" ? "Вы:" : "Бот:"}
                </p>
                <div className="whitespace-pre-wrap">
                  {msg.role === "assistant" ? formatScriptResponse(msg.content) : msg.content}
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handlePromptSubmit}
          className="w-full p-4 bg-gray-800 border-t border-gray-700 flex justify-center"
        >
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Опишите, какой сценарий вам нужен..."
            className="w-3/4 p-3 rounded-xl bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`ml-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Генерация..." : "Отправить"}
          </button>
        </form>
      </main>

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