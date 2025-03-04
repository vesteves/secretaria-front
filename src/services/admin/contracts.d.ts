import { Base } from 'src/types/base';

export interface ContractBase {
  student_id: number
  group_student_id: number
  course_id: number
  group_id: number
  content: string
}

export type Contract = Base & ContractBase
