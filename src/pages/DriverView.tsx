import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, doc, updateDoc } from 'firebase/firestore';

const DriverView = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  // Live Listener
  useEffect(() => {
    const q = query(
      collection(db, "users"),
      where("role", "==", "household"),
      where("deviceStatus", "==", "dispatched")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleComplete = async (userId: string) => {
    const userRef = doc(db, "users", userId);
    try {
      await updateDoc(userRef, {
        gasLevel: 100,
        deviceStatus: "online",
        lastRefillDate: new Date().toISOString()
      });
    } catch {
      alert("Error updating refill status");
    }
  };

  const openMaps = (address: string) => {
    const coords = address.match(/-?\d+\.\d+/g);
    if (coords && coords.length >= 2) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${coords[0]},${coords[1]}`;
      window.open(url, '_blank');
    } else {
      alert("Invalid location format.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const currentTask = tasks[0];
  const queue = tasks.slice(1);

  const getGasColor = (level: number) => {
    if (level < 20) return "bg-red-500";
    if (level < 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-5 pb-24">

      {/* HEADER */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold">Driver Dashboard</h1>
          <p className="text-sm text-gray-500">
            {tasks.length} Active Deliveries
          </p>
        </div>

        <button
          onClick={() => setIsOnline(!isOnline)}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            isOnline
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </button>
      </header>

      {/* TODAY SUMMARY */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-xs text-gray-500">Completed Today</p>
          <p className="text-lg font-bold">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-xs text-gray-500">Earnings</p>
          <p className="text-lg font-bold">₦12,500</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-xs text-gray-500">Rating</p>
          <p className="text-lg font-bold">4.8 ⭐</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-xs text-gray-500">Hours Online</p>
          <p className="text-lg font-bold">6h 20m</p>
        </div>
      </div>

      {/* CURRENT DELIVERY */}
      {currentTask && (
        <section className="mb-6">
          <h2 className="text-sm font-semibold mb-3 text-blue-600">
            Current Delivery
          </h2>

          <div className="bg-white p-5 rounded-2xl shadow-md border">
            <h3 className="font-bold text-lg mb-1">
              {currentTask.fullName}
            </h3>
            <p className="text-sm text-gray-500 mb-4 truncate">
              {currentTask.address}
            </p>

            {/* Gas Level Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Gas Level</span>
                <span>{currentTask.gasLevel}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getGasColor(currentTask.gasLevel)}`}
                  style={{ width: `${currentTask.gasLevel}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => openMaps(currentTask.address)}
                className="flex-1 bg-gray-100 py-3 rounded-xl font-medium"
              >
                Navigate
              </button>

              <button
                onClick={() => handleComplete(currentTask.id)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold"
              >
                Confirm Refill
              </button>
            </div>
          </div>
        </section>
      )}

      {/* DELIVERY QUEUE */}
      {queue.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold mb-3 text-gray-600">
            Delivery Queue
          </h2>

          <div className="space-y-3">
            {queue.map(task => (
              <div
                key={task.id}
                className="bg-white p-4 rounded-xl shadow-sm border"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{task.fullName}</p>
                    <p className="text-xs text-gray-500 truncate max-w-[200px]">
                      {task.address}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-gray-600">
                    {task.gasLevel}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default DriverView;