import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDisLikeCommentary } from 'app/shared/model/dis-like-commentary.model';

type EntityResponseType = HttpResponse<IDisLikeCommentary>;
type EntityArrayResponseType = HttpResponse<IDisLikeCommentary[]>;

@Injectable({ providedIn: 'root' })
export class DisLikeCommentaryService {
  public resourceUrl = SERVER_API_URL + 'api/dis-like-commentaries';

  constructor(protected http: HttpClient) {}

  create(disLikeCommentary: IDisLikeCommentary): Observable<EntityResponseType> {
    return this.http.post<IDisLikeCommentary>(this.resourceUrl, disLikeCommentary, { observe: 'response' });
  }

  update(disLikeCommentary: IDisLikeCommentary): Observable<EntityResponseType> {
    return this.http.put<IDisLikeCommentary>(this.resourceUrl, disLikeCommentary, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDisLikeCommentary>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDisLikeCommentary[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
