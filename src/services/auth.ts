import type { LoginPayload } from './auth.d'

import { api } from 'src/boot/axios';

export const login = async (payload: LoginPayload) => {
  return await api.post('/auth/login', payload)
}