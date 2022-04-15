import { Moment } from 'moment';

export interface ICommentary {
  id?: number;
  description?: string;
  dateCreated?: Moment;
  dateModified?: Moment;
  isModified?: boolean;
  extendedUserId?: number;
  albumId?: number;
}

export class Commentary implements ICommentary {
  constructor(
    public id?: number,
    public description?: string,
    public dateCreated?: Moment,
    public dateModified?: Moment,
    public isModified?: boolean,
    public extendedUserId?: number,
    public albumId?: number
  ) {
    this.isModified = this.isModified || false;
  }
}
