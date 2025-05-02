import React from 'react';

// Определяем типы для пропсов кнопки
type ButtonProps = {
  children: React.ReactNode; // Текст или иконка внутри кнопки
  onClick?: () => void; // Функция при клике (необязательно)
  variant?: 'primary' | 'secondary' | 'danger'; // Варианты стиля
  className?: string; // Дополнительные классы снаружи (необязательно)
  // Можно добавить другие пропсы HTML кнопки: type, disabled и т.д.
} & React.ButtonHTMLAttributes<HTMLButtonElement>; // Наследуем стандартные атрибуты кнопки

export default function Button({
  children,
  onClick,
  variant = 'primary', // По умолчанию - primary
  className = '',
  ...props // Остальные пропсы (type="button", disabled и т.д.)
}: ButtonProps) {

  // Определяем базовые стили для всех кнопок
  const baseStyle = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ease-in-out";

  // Определяем стили для разных вариантов
  let variantStyle = '';
  switch (variant) {
    case 'secondary':
      variantStyle = "bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-500";
      break;
    case 'danger':
      variantStyle = "bg-red-600 hover:bg-red-500 text-white focus:ring-red-500";
      break;
    case 'primary':
    default:
      variantStyle = "bg-sky-600 hover:bg-sky-500 text-white focus:ring-sky-500"; // Пример синего/голубого
      break;
  }

  return (
    <button
      onClick={onClick}
      // Объединяем базовые, вариантные и внешние классы
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props} // Передаем остальные пропсы
    >
      {children}
    </button>
  );
}
