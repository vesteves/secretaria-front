import { Base } from 'src/types/base';
import { Student } from './students.d';
import { Course } from './courses.d';
import { Group } from './groups.d';

export interface ContractBase {
  student_id: number
  student: Student
  group_student_id: number
  course_id: number
  course: Course
  group_id: number
  group: Group
  content: string
}

export type Contract = Base & ContractBase
