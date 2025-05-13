import React from 'react';

const ScenarioDetail = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">TikTok для фотографа</h1>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Редактировать</button>
        </div>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <p className="text-yellow-400 text-lg font-bold mb-3">Кадр 1:</p>
        <div className="border-l-4 border-yellow-400 pl-4 mb-3">
          <p className="text-gray-400">[Фотограф за работой: делает кадр, рядом модель или свадебная пара]</p>
          <p className="text-blue-400 italic">Текст на экране</p>
          <p className="text-white">"Делаю классные фото. Но заказов почти нет"</p>
        </div>

        <p className="text-yellow-400 text-lg font-bold mb-3">Кадр 2:</p>
        <div className="border-l-4 border-yellow-400 pl-4 mb-3">
          <p className="text-gray-400">[Старый пост: разрозненные снимки без описания, в личном аккаунте]</p>
          <p className="text-blue-400 italic">Текст на экране:</p>
          <p className="text-white">"Не тот формат. Не та подача. Не та реклама."</p>
        </div>

        <p className="text-yellow-400 text-lg font-bold mb-3">Кадр 3:</p>
        <div className="border-l-4 border-yellow-400 pl-4 mb-3">
          <p className="text-gray-400">[Новый скрин: карточка курса, фото, заголовок, описание]</p>
          <p className="text-blue-400 italic">Голос за кадром:</p>
          <p className="text-white">"Портфолио. Аккаунт. Реклама."</p>
        </div>

        <p className="text-yellow-400 text-lg font-bold mb-3">Кадр 4:</p>
        <div className="border-l-4 border-yellow-400 pl-4 mb-3">
          <p className="text-gray-400">[Сообщения от клиентов, договоры, благодарности]</p>
          <p className="text-blue-400 italic">Текст на экране:</p>
          <p className="text-white">"Продавай свои услуги правильно. Чек-лист в профиле."</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-400">
        <div>
          <span className="mr-4">Платформа: TikTok</span>
          <span>Создано: 07.05.2025</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">Рейтинг:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioDetail;