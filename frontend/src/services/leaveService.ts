
import api from './http';

export const getLeaves = async () => {
  const res = await api.get('/leaves');
  return res.data;
};

export const createLeave = async (leaveData: {
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
}) => {
  const res = await api.post('/leaves', leaveData);
  return res.data;
};

export const updateLeave = async (id: number, leaveData: {
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
}) => {
  const res = await api.put(`/leaves/${id}`, leaveData);
  return res.data;
};

export const deleteLeave = async (id: number) => {
  const res = await api.delete(`/leaves/${id}`);
  return res.data;
};
