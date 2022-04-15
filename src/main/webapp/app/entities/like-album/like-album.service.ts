import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ILikeAlbum } from 'app/shared/model/like-album.model';

type EntityResponseType = HttpResponse<ILikeAlbum>;
type EntityArrayResponseType = HttpResponse<ILikeAlbum[]>;

@Injectable({ providedIn: 'root' })
export class LikeAlbumService {
  public resourceUrl = SERVER_API_URL + 'api/like-albums';

  constructor(protected http: HttpClient) {}

  create(likeAlbum: ILikeAlbum): Observable<EntityResponseType> {
    return this.http.post<ILikeAlbum>(this.resourceUrl, likeAlbum, { observe: 'response' });
  }

  update(likeAlbum: ILikeAlbum): Observable<EntityResponseType> {
    return this.http.put<ILikeAlbum>(this.resourceUrl, likeAlbum, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILikeAlbum>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILikeAlbum[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
