// pages/Dashboard.tsx
import React from "react";
import DashboardLayout from "../components/DashboardLayout";

interface Device {
  id: number;
  name: string;
  currentUsage: number; // in watts
  totalToday: number;   // in kWh
  costEstimate: number; // in $
}

const sampleDevices: Device[] = [
  { id: 1, name: "Device 1", currentUsage: 120, totalToday: 3.2, costEstimate: 0.75 },
  { id: 2, name: "Device 2", currentUsage: 200, totalToday: 4.7, costEstimate: 1.1 },
  { id: 3, name: "Device 3", currentUsage: 95, totalToday: 2.4, costEstimate: 0.52 },
];

const Dashboard: React.FC = () => {
    const handleLogout = ()=>{
        
    }
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Device Readings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white p-6 rounded shadow hover:shadow-lg transition duration-200"
          >
            <h2 className="text-lg font-semibold mb-2">{device.name}</h2>
            <p className="text-gray-600">
              <span className="font-medium">Current Usage:</span>{" "}
              <span className="text-blue-600">{device.currentUsage} W</span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Total Today:</span>{" "}
              <span className="text-green-600">{device.totalToday} kWh</span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Cost Estimate:</span>{" "}
              <span className="text-red-500">${device.costEstimate.toFixed(2)}</span>
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
