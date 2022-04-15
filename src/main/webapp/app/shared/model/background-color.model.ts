import { IExtendedUser } from 'app/shared/model/extended-user.model';

export interface IBackgroundColor {
  id?: number;
  name?: string;
  code?: string;
  extendedUsers?: IExtendedUser[];
}

export class BackgroundColor implements IBackgroundColor {
  constructor(public id?: number, public name?: string, public code?: string, public extendedUsers?: IExtendedUser[]) {}
}
