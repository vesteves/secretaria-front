import { Base } from 'src/types/base';

export interface GroupBase {
  start: string;
  end: string;
  price: number;
  discount: number;
  course_id: number;
}

export type Group = Base & GroupBase;

export type GroupStore = GroupBase;

export type GroupUpdate = Partial<GroupBase>;
