import { api } from 'src/boot/axios';
import type { CourseStore, CourseUpdate } from './courses.d';

export const getAll = async () => {
  return await api.get('/course');
};

export const getById = async (id: number) => {
  return await api.get(`/course/${id}`);
};

export const store = async (payload: CourseStore) => {
  return await api.post('/course', payload);
};

export const update = async (id: number, payload: CourseUpdate) => {
  return await api.put(`/course/${id}`, payload);
};

export const destroy = async (id: number) => {
  return await api.delete(`/course/${id}`);
};
