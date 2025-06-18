// components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate()
     const handleLogout = ()=>{
            localStorage.removeItem("token")
            navigate("/")
        }
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Welcome, User</span>
        <button className="text-sm text-red-500 hover:underline" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
