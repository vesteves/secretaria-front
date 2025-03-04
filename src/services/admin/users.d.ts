import { Base } from 'src/types/base';

export enum Profile {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  SECRETARY = 'secretary'
}

export interface UserBase {
  name: string
  email: string
  profile: Profile
  password: string
}

export type User = Base & UserBase

export type UserStore = UserBase

export type UserUpdate = Partial<UserBase>
