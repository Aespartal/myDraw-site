import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExtendedUser } from 'app/shared/model/extended-user.model';

type EntityResponseType = HttpResponse<IExtendedUser>;
type EntityArrayResponseType = HttpResponse<IExtendedUser[]>;

@Injectable({ providedIn: 'root' })
export class ExtendedUserService {
  public resourceUrl = SERVER_API_URL + 'api/extended-users';

  constructor(protected http: HttpClient) {}

  create(extendedUser: IExtendedUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(extendedUser);
    return this.http
      .post<IExtendedUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(extendedUser: IExtendedUser): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(extendedUser);
    return this.http
      .put<IExtendedUser>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IExtendedUser>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IExtendedUser[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(extendedUser: IExtendedUser): IExtendedUser {
    const copy: IExtendedUser = Object.assign({}, extendedUser, {
      birthdate: extendedUser.birthdate && extendedUser.birthdate.isValid() ? extendedUser.birthdate.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthdate = res.body.birthdate ? moment(res.body.birthdate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((extendedUser: IExtendedUser) => {
        extendedUser.birthdate = extendedUser.birthdate ? moment(extendedUser.birthdate) : undefined;
      });
    }
    return res;
  }
}
