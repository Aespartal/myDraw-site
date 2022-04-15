import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILikeCommentary } from 'app/shared/model/like-commentary.model';

type EntityResponseType = HttpResponse<ILikeCommentary>;
type EntityArrayResponseType = HttpResponse<ILikeCommentary[]>;

@Injectable({ providedIn: 'root' })
export class LikeCommentaryService {
  public resourceUrl = SERVER_API_URL + 'api/like-commentaries';

  constructor(protected http: HttpClient) {}

  create(likeCommentary: ILikeCommentary): Observable<EntityResponseType> {
    return this.http.post<ILikeCommentary>(this.resourceUrl, likeCommentary, { observe: 'response' });
  }

  update(likeCommentary: ILikeCommentary): Observable<EntityResponseType> {
    return this.http.put<ILikeCommentary>(this.resourceUrl, likeCommentary, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILikeCommentary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILikeCommentary[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
