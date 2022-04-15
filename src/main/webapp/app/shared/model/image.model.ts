export interface IImage {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  imageContentType?: string;
  albumId?: number;
}

export class Image implements IImage {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public image?: string,
    public imageContentType?: string,
    public albumId?: number
  ) {}
}
