import { api } from 'src/boot/axios';
import type { StudentQueryParams, StudentStore, StudentUpdate } from './students.d';

export const getAll = async (query: StudentQueryParams = {}) => {
  return await api.get('/student', {
    params: query
  });
};

export const getById = async (id: number) => {
  return await api.get(`/student/${id}`);
};

export const getByCpf = async (cpf: string) => {
  return await api.get(`/student/${cpf}/verify`);
};

export const store = async (payload: StudentStore) => {
  return await api.post('/student', payload);
};

export const update = async (id: number, payload: StudentUpdate) => {
  return await api.put(`/student/${id}`, payload);
};

export const destroy = async (id: number) => {
  return await api.delete(`/student/${id}`);
};