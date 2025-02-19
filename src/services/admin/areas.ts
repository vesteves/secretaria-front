import { api } from 'src/boot/axios';
import type { AreaStore, AreaUpdate } from './areas.d';

export const getAll = async () => {
  return await api.get('/area');
};

export const getById = async (id: number) => {
  return await api.get(`/area/${id}`);
};

export const store = async (payload: AreaStore) => {
  return await api.post('/area', payload);
};

export const update = async (id: number, payload: AreaUpdate) => {
  return await api.put(`/area/${id}`, payload);
};

export const destroy = async (id: number) => {
  return await api.delete(`/area/${id}`);
};
