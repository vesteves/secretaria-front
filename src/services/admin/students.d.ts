import { Base } from 'src/types/base';

export interface StudentBase {
  name: string
  email: string
  birthdate: string
  phone: string
  identity: string
  cpf: string
  cep: string
  address: string
  education: string
  graduate: string
  workspace: string
  course_id: number
  group_id: number
  modality: string
  payment: string
  discover: string
  google: boolean
  deficit: string | null
}

export type Student = Base & StudentBase

export type StudentStore = StudentBase

export type StudentUpdate = Partial<StudentBase>
