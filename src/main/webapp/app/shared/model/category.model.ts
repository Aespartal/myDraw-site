import { IAlbum } from 'app/shared/model/album.model';

export interface ICategory {
  id?: number;
  name?: string;
  description?: string;
  albums?: IAlbum[];
}

export class Category implements ICategory {
  constructor(public id?: number, public name?: string, public description?: string, public albums?: IAlbum[]) {}
}
