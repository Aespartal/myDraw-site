import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBackgroundColor } from 'app/shared/model/background-color.model';

type EntityResponseType = HttpResponse<IBackgroundColor>;
type EntityArrayResponseType = HttpResponse<IBackgroundColor[]>;

@Injectable({ providedIn: 'root' })
export class BackgroundColorService {
  public resourceUrl = SERVER_API_URL + 'api/background-colors';

  constructor(protected http: HttpClient) {}

  create(backgroundColor: IBackgroundColor): Observable<EntityResponseType> {
    return this.http.post<IBackgroundColor>(this.resourceUrl, backgroundColor, { observe: 'response' });
  }

  update(backgroundColor: IBackgroundColor): Observable<EntityResponseType> {
    return this.http.put<IBackgroundColor>(this.resourceUrl, backgroundColor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBackgroundColor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBackgroundColor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
