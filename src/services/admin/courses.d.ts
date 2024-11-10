import { Base } from 'src/types/base';

export interface CourseBase {
  name: string
  summary: string
  description: string
}

export type Course = Base & CourseBase

export type CourseStore = CourseBase

export type CourseUpdate = Partial<CourseBase>
