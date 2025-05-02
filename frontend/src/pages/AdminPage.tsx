import React from "react";

const AdminPage = () => {
  const handleButtonClick = async (action: string) => {
    try {
      // Здесь будет вызов API, например:
      // const response = await fetch(`/api/admin/${action}`);
      // const data = await response.json();
      // alert(JSON.stringify(data, null, 2));
      alert(`Выполнено действие: ${action}`);
    } catch (err) {
      alert(`Ошибка при выполнении: ${action}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-center">Админ-панель</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdminCard title="Управление пользователями">
          <BlueButton text="Удалить пользователя" onClick={() => handleButtonClick("deleteUser")} />
          <BlueButton text="Заблокировать" onClick={() => handleButtonClick("blockUser")} />
          <BlueButton text="Восстановить" onClick={() => handleButtonClick("restoreUser")} />
          <BlueButton text="Изменить роль" onClick={() => handleButtonClick("changeRole")} />
        </AdminCard>

        <AdminCard title="Модерация контента">
          <BlueButton text="Проверить сценарии" onClick={() => handleButtonClick("checkScripts")} />
          <BlueButton text="Удалить неприемлемый контент" onClick={() => handleButtonClick("deleteContent")} />
        </AdminCard>

        <AdminCard title="Мониторинг платформы">
          <BlueButton text="Статистика использования" onClick={() => handleButtonClick("usageStats")} />
          <BlueButton text="Логи активности" onClick={() => handleButtonClick("activityLogs")} />
        </AdminCard>

        <AdminCard title="Обновления ИИ-модели">
          <BlueButton text="Проверить версию" onClick={() => handleButtonClick("checkVersion")} />
          <BlueButton text="Обновить модель" onClick={() => handleButtonClick("updateModel")} />
        </AdminCard>

        <AdminCard title="Служба поддержки">
          <BlueButton text="Обратная связь" onClick={() => handleButtonClick("feedback")} />
          <BlueButton text="Ответить пользователю" onClick={() => handleButtonClick("replyUser")} />
        </AdminCard>
      </div>
    </div>
  );
};

const AdminCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800 rounded-2xl shadow-lg p-6 space-y-3">
    <h2 className="text-lg font-semibold text-gray-200">{title}</h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const BlueButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="w-full bg-indigo-600 text-white py-2 rounded-xl font-medium hover:bg-indigo-500 transition"
  >
    {text}
  </button>
);

export default AdminPage;
