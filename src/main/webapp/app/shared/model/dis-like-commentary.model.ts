export interface IDisLikeCommentary {
  id?: number;
  extendedUserId?: number;
  comentaryId?: number;
}

export class DisLikeCommentary implements IDisLikeCommentary {
  constructor(public id?: number, public extendedUserId?: number, public comentaryId?: number) {}
}
