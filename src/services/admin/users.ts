import { api } from 'src/boot/axios';
import type { UserStore, UserUpdate } from './users.d';

export const getAll = async () => {
  return await api.get('/user');
};

export const getById = async (id: number) => {
  return await api.get(`/user/${id}`);
};

export const store = async (payload: UserStore) => {
  return await api.post('/user', payload);
};

export const update = async (id: number, payload: UserUpdate) => {
  return await api.put(`/user/${id}`, payload);
};

export const destroy = async (id: number) => {
  return await api.delete(`/user/${id}`);
};
