export interface ILikeAlbum {
  id?: number;
  extendedUserId?: number;
  albumId?: number;
}

export class LikeAlbum implements ILikeAlbum {
  constructor(public id?: number, public extendedUserId?: number, public albumId?: number) {}
}
