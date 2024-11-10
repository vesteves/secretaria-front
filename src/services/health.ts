import { api } from 'src/boot/axios';

export const getHealth = async () => {
  return await api.get('/health')
}