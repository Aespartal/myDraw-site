import { Moment } from 'moment';
import { IAlbum } from 'app/shared/model/album.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IExtendedUser {
  id?: number;
  telephone?: string;
  birthdate?: Moment;
  description?: string;
  imageCoverContentType?: string;
  imageCover?: any;
  gender?: Gender;
  userId?: number;
  albums?: IAlbum[];
  backgroundColorId?: number;
}

export class ExtendedUser implements IExtendedUser {
  constructor(
    public id?: number,
    public telephone?: string,
    public birthdate?: Moment,
    public description?: string,
    public imageCoverContentType?: string,
    public imageCover?: any,
    public gender?: Gender,
    public userId?: number,
    public albums?: IAlbum[],
    public backgroundColorId?: number
  ) {}
}
