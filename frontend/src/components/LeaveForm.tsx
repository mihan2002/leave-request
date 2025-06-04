import React, { useState, useEffect } from "react";
import { createLeave, updateLeave } from "../services/leaveService";
import { leaveBus } from "../utils/rxBus";

type Props = {
  editingLeave?: {
    id: number;
    type: string;
    startDate: string;
    endDate: string;
    reason: string;
  } | null;
};

const LeaveForm: React.FC<Props> = ({ editingLeave }) => {
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingLeave) {
      setType(editingLeave.type);
      setStartDate(editingLeave.startDate);
      setEndDate(editingLeave.endDate);
      setReason(editingLeave.reason);
    }
  }, [editingLeave]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!type || !startDate || !endDate || !reason) {
      setError("All fields are required.");
      return;
    }

    try {
      if (editingLeave) {
        await updateLeave(editingLeave.id, { type, startDate, endDate, reason });
      } else {
        await createLeave({ type, startDate, endDate, reason });
      }

      leaveBus.next("refresh-leave-list");
    } catch (err) {
      setError("Failed to submit leave request.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold mb-4 text-center">
        {editingLeave ? "Update Leave" : "Request Leave"}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="type">Leave Type</label>
        <input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="startDate">Start Date</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="endDate">End Date</label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2" htmlFor="reason">Reason</label>
        <textarea id="reason" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full border rounded px-3 py-2" rows={4} />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        {editingLeave ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default LeaveForm;
