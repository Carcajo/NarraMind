import React from 'react'
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900">
    <div className="p-4">
      <nav className="mb-4 space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/scenarios">Scenarios</Link>
      </nav>
      <Outlet />
    </div>
    </div>
  );
}
