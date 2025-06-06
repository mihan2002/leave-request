import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { leaveBus } from "../utils/rxBus";
import LeaveForm from "./LeaveForm";
import { logout } from "../services/authService";
import { getLeaves, deleteLeave } from "../services/leaveService";

type Leave = {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
};

export default function LeaveList() {
  const [leaves, setLeaves] = useState<Leave[]>([
    {
      id: 1,
      type: "test",
      startDate: "test",
      endDate: "test",
      reason: "test",
    },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingLeave, setEditingLeave] = useState<Leave | null>(null);
  const navigate = useNavigate();

  const fetchLeaves = async () => {
    try {
      const res = await getLeaves();

      if (Array.isArray(res)) {
        setLeaves(res);
      } else {
        console.warn("Unexpected response format:", res);
        setLeaves([]);
      }
    } catch (err) {
      console.error("Failed to fetch leaves:", err);
      setLeaves([]);
    }
  };

  useEffect(() => {
    fetchLeaves();

    const sub = leaveBus.subscribe((event) => {
      if (event === "refresh-leave-list") {
        fetchLeaves();
        setShowForm(false);
        setEditingLeave(null);
      }
    });

    return () => sub.unsubscribe();
  }, []);

  const handleUpdate = (leave: Leave) => {
    setEditingLeave(leave);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditingLeave(null);
    setShowForm(true);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave request?"
    );
    if (!confirmDelete) return;

    try {
      await deleteLeave(id);
      fetchLeaves(); // refresh the list
    } catch (err) {
      console.error("Failed to delete leave request:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Leave Requests</h1>
        <div className="flex gap-2">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handleNew}
          >
            + New Leave
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {leaves.length === 0 ? (
        <p className="text-center text-gray-500">No leave requests found.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Start Date</th>
              <th className="border px-4 py-2">End Date</th>
              <th className="border px-4 py-2">Reason</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.id} className="text-center">
                <td className="border px-4 py-2">{leave.type}</td>
                <td className="border px-4 py-2">{leave.startDate}</td>
                <td className="border px-4 py-2">{leave.endDate}</td>
                <td className="border px-4 py-2">{leave.reason}</td>
                <td className="border px-4 py-2 flex justify-center gap-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
                    onClick={() => handleUpdate(leave)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    onClick={() => handleDelete(leave.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl relative">
            <button
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              onClick={() => {
                setShowForm(false);
                setEditingLeave(null);
              }}
            >
              &times;
            </button>
            <LeaveForm editingLeave={editingLeave} />
          </div>
        </div>
      )}
    </div>
  );
}
