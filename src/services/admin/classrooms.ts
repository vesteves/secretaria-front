import { api } from 'src/boot/axios';
import type { ClassroomStore, ClassroomUpdate } from './classrooms.d';

export const getAll = async () => {
  return await api.get('/classroom');
};

export const getById = async (id: number) => {
  return await api.get(`/classroom/${id}`);
};

export const store = async (payload: ClassroomStore) => {
  return await api.post('/classroom', payload);
};

export const update = async (id: number, payload: ClassroomUpdate) => {
  return await api.put(`/classroom/${id}`, payload);
};

export const destroy = async (id: number) => {
  return await api.delete(`/classroom/${id}`);
};
