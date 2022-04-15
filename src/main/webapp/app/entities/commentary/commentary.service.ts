import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICommentary } from 'app/shared/model/commentary.model';

type EntityResponseType = HttpResponse<ICommentary>;
type EntityArrayResponseType = HttpResponse<ICommentary[]>;

@Injectable({ providedIn: 'root' })
export class CommentaryService {
  public resourceUrl = SERVER_API_URL + 'api/commentaries';

  constructor(protected http: HttpClient) {}

  create(commentary: ICommentary): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commentary);
    return this.http
      .post<ICommentary>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(commentary: ICommentary): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(commentary);
    return this.http
      .put<ICommentary>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICommentary>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICommentary[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(commentary: ICommentary): ICommentary {
    const copy: ICommentary = Object.assign({}, commentary, {
      dateCreated: commentary.dateCreated && commentary.dateCreated.isValid() ? commentary.dateCreated.toJSON() : undefined,
      dateModified: commentary.dateModified && commentary.dateModified.isValid() ? commentary.dateModified.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreated = res.body.dateCreated ? moment(res.body.dateCreated) : undefined;
      res.body.dateModified = res.body.dateModified ? moment(res.body.dateModified) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((commentary: ICommentary) => {
        commentary.dateCreated = commentary.dateCreated ? moment(commentary.dateCreated) : undefined;
        commentary.dateModified = commentary.dateModified ? moment(commentary.dateModified) : undefined;
      });
    }
    return res;
  }
}
