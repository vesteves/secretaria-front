import { api } from 'src/boot/axios';

export const getAll = async () => {
  return await api.get('/contract');
};

export const getById = async (id: number) => {
  return await api.get(`/contract/${id}`);
};
