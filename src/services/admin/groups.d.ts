import { Base } from 'src/types/base';
import { StudentStatus } from './students.d';

export interface GroupBase {
  start: string;
  end: string;
  price: number;
  course_id: number;
  frequency: string[];
  teacher: string;
  inCompany: boolean;
  classroom_id?: number;
}

export type Group = Base & GroupBase;

export type GroupStore = GroupBase;

export type GroupUpdate = Partial<GroupBase>;

export interface StatusData {
  status: StudentStatus
  student_id: number
  price?: number
  links?: string
}
