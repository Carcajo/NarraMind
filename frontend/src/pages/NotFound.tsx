import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/log.png';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Страница не найдена</p>
      <img
        src={Logo}
        alt="Not Found"
        className="w-64 h-auto mb-6"
      />
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
