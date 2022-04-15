import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICommentary, Commentary } from 'app/shared/model/commentary.model';
import { CommentaryService } from './commentary.service';
import { CommentaryComponent } from './commentary.component';
import { CommentaryDetailComponent } from './commentary-detail.component';
import { CommentaryUpdateComponent } from './commentary-update.component';

@Injectable({ providedIn: 'root' })
export class CommentaryResolve implements Resolve<ICommentary> {
  constructor(private service: CommentaryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICommentary> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((commentary: HttpResponse<Commentary>) => {
          if (commentary.body) {
            return of(commentary.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Commentary());
  }
}

export const commentaryRoute: Routes = [
  {
    path: '',
    component: CommentaryComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'Commentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CommentaryDetailComponent,
    resolve: {
      commentary: CommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CommentaryUpdateComponent,
    resolve: {
      commentary: CommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CommentaryUpdateComponent,
    resolve: {
      commentary: CommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Commentaries',
    },
    canActivate: [UserRouteAccessService],
  },
];
