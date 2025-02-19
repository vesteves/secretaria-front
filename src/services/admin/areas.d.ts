import { Base } from 'src/types/base';

export interface AreaBase {
  name: string
  position: number
}

export type Area = Base & AreaBase

export type AreaStore = AreaBase

export type AreaUpdate = Partial<AreaBase>
