// pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";

interface Reading {
  deviceId: string;
  name: string;
  latestReading: {
    timestamp: string;
    voltage: number;
    current: number;
    power: number;
    energy: number;
    cost: number;
  } | null;
}

// const sampleDevices: Device[] = [
//   {
//     id: 1,
//     name: "Device 1",
//     currentUsage: 120,
//     totalToday: 3.2,
//     costEstimate: 0.75,
//   },
//   {
//     id: 2,
//     name: "Device 2",
//     currentUsage: 200,
//     totalToday: 4.7,
//     costEstimate: 1.1,
//   },
//   {
//     id: 3,
//     name: "Device 3",
//     currentUsage: 95,
//     totalToday: 2.4,
//     costEstimate: 0.52,
//   },
// ];

const Dashboard: React.FC = () => {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDevices = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`http://localhost:5000/api/reading/latest`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch devices");
        }
        const data = await res.json();
        setReadings(data);
        console.log(data);
      } catch (error) {
        setError(`${error}`);
      }
    };
    getDevices();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Device Readings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {readings.map((reading) => (
          <div
            key={reading.deviceId}
            className="bg-white p-6 rounded shadow hover:shadow-lg transition duration-200"
          >
            <h2 className="text-lg font-semibold mb-2">{reading?.name}</h2>
            <p className="text-gray-600">
              <span className="font-medium">Voltage:</span>{" "}
              <span className="text-blue-600">
                {reading.latestReading?.voltage}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Current:</span>{" "}
              <span className="text-blue-600">
                {reading.latestReading?.current}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Power:</span>{" "}
              <span className="text-blue-600">
                {reading.latestReading?.power}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Energy:</span>{" "}
              <span className="text-blue-600">
                {reading.latestReading?.energy}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Cost:</span>{" "}
              <span className="text-blue-600">
                {reading.latestReading?.cost}
              </span>
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Last updated:</span>{" "}
              <span className="text-blue-600">
                {reading.latestReading?.timestamp}
              </span>
            </p>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

// pages/Dashboard.tsx
// import React, { useEffect, useState, useCallback } from "react";
// import DashboardLayout from "../components/DashboardLayout";

// interface Reading {
//   deviceId: string;
//   name: string;
//   latestReading: {
//     timestamp: string;
//     voltage: number;
//     current: number;
//     power: number;
//     energy: number;
//     cost: number;
//   } | null;
// }

// const Dashboard: React.FC = () => {
//   const [readings, setReadings] = useState<Reading[]>([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchReadings = useCallback(async () => {
//     const token = localStorage.getItem("token");
//     setIsLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/reading/latest`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!res.ok) {
//         throw new Error("Failed to fetch devices");
//       }
//       const data = await res.json();
//       setReadings(data);
//       setError(""); // Clear any previous errors
//     } catch (error) {
//       setError(`${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     // Initial fetch
//     fetchReadings();

//     // Set up polling every 5 seconds
//     const interval = setInterval(fetchReadings, 5000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, [fetchReadings]);

//   return (
//     <DashboardLayout>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Device Readings</h1>
//         <div className="flex items-center gap-2">
//           {isLoading && (
//             <div className="flex items-center text-blue-600">
//               <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
//               Updating...
//             </div>
//           )}
//           <button
//             onClick={fetchReadings}
//             className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//           >
//             Refresh
//           </button>
//         </div>
//       </div>
      
//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
//           {error}
//         </div>
//       )}
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {readings.map((reading) => (
//           <div
//             key={reading.deviceId}
//             className="bg-white p-6 rounded shadow hover:shadow-lg transition duration-200"
//           >
//             <h2 className="text-lg font-semibold mb-2">{reading?.name}</h2>
//             <p className="text-gray-600">
//               <span className="font-medium">Voltage:</span>{" "}
//               <span className="text-blue-600">
//                 {reading.latestReading?.voltage}
//               </span>
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Current:</span>{" "}
//               <span className="text-blue-600">
//                 {reading.latestReading?.current}
//               </span>
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Power:</span>{" "}
//               <span className="text-blue-600">
//                 {reading.latestReading?.power}
//               </span>
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Energy:</span>{" "}
//               <span className="text-blue-600">
//                 {reading.latestReading?.energy}
//               </span>
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Cost:</span>{" "}
//               <span className="text-blue-600">
//                 {reading.latestReading?.cost}
//               </span>
//             </p>
//             <p className="text-gray-600">
//               <span className="font-medium">Last updated:</span>{" "}
//               <span className="text-blue-600">
//                 {reading.latestReading?.timestamp}
//               </span>
//             </p>
//           </div>
//         ))}
//       </div>
//     </DashboardLayout>
//   );
// };

// export default Dashboard;