import { Base } from 'src/types/base';

export interface ClassroomBase {
  classroom: string
  total: number
}

export type Classroom = Base & ClassroomBase

export type ClassroomStore = ClassroomBase

export type ClassroomUpdate = Partial<ClassroomBase>
