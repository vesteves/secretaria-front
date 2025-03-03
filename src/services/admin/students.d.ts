import { Base } from 'src/types/base';

export interface StudentBase {
  cpf: string
  course_id: number
  group_id: number
  modality: string
  payment: string
  name?: string
  email?: string
  birthdate?: string
  phone?: string
  identity?: string
  cep?: string
  address?: string
  education?: string
  graduate?: string
  workspace?: string
  discover?: string
  google?: boolean
  deficit?: string | null
}

export type Student = Base & StudentBase

export type StudentStore = StudentBase

export type StudentUpdate = Partial<StudentBase>

export enum StudentStatus {
  PRESUBSCRIBED = 'presubscribed',
  PAYMENTSENT = 'paymentsent',
  SUBSCRIBED = 'subscribed',
  APPROVED = 'approved',
  REPROVED = 'reproved',
  UNSUBSCRIBED = 'unsubscribed',
}
export interface StudentQueryParams {
  group_id?: number
}