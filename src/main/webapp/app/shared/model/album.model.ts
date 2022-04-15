import { Moment } from 'moment';
import { IImage } from 'app/shared/model/image.model';

export interface IAlbum {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  imageContentType?: string;
  order?: number;
  date?: Moment;
  images?: IImage[];
  extendedUserId?: number;
  categoryId?: number;
}

export class Album implements IAlbum {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public image?: string,
    public imageContentType?: string,
    public order?: number,
    public date?: Moment,
    public images?: IImage[],
    public extendedUserId?: number,
    public categoryId?: number
  ) {}
}
