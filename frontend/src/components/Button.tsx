import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  onClick,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {

  const baseStyle = "px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 ease-in-out";

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
      variantStyle = "bg-sky-600 hover:bg-sky-500 text-white focus:ring-sky-500";
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
