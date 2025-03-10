import { api } from 'src/boot/axios';
import type { GroupStore, GroupUpdate, StatusData } from './groups.d';

export const getAll = async (params: { course?: string } = {}) => {
  const queryParams = params.course ? '?course=true' : '';

  return await api.get(`/group${queryParams}`);
};

export const getById = async (id: number) => {
  return await api.get(`/group/${id}`);
};

export const getNextGroupsByCourseId = async (courseId: number) => {
  return await api.get(`/group/next-groups/${courseId}`);
};

export const store = async (payload: GroupStore) => {
  return await api.post('/group', payload);
};

export const update = async (id: number, payload: GroupUpdate) => {
  return await api.put(`/group/${id}`, payload);
};

export const destroy = async (id: number) => {
  return await api.delete(`/group/${id}`);
};

export const changeStudentStatus = async (id: number, payload: StatusData) => {
  return await api.patch(`/group/${id}/status`, payload);
};
