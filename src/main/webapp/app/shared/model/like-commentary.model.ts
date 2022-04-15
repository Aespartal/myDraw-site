export interface ILikeCommentary {
  id?: number;
  extendedUserId?: number;
  comentaryId?: number;
}

export class LikeCommentary implements ILikeCommentary {
  constructor(public id?: number, public extendedUserId?: number, public comentaryId?: number) {}
}
