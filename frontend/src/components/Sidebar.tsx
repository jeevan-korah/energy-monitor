// components/Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-full">
      <div className="p-4 text-xl font-bold border-b">Energy Monitor</div>
      <nav className="p-4">
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link></li>
          <li><Link to="/devices" className="text-gray-700 hover:text-blue-500">Devices</Link></li>
          <li><Link to="/readings" className="text-gray-700 hover:text-blue-500">Readings</Link></li>
          <li><Link to="/settings" className="text-gray-700 hover:text-blue-500">Settings</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
