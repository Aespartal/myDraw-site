import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILikeCommentary, LikeCommentary } from 'app/shared/model/like-commentary.model';
import { LikeCommentaryService } from './like-commentary.service';
import { LikeCommentaryComponent } from './like-commentary.component';
import { LikeCommentaryDetailComponent } from './like-commentary-detail.component';
import { LikeCommentaryUpdateComponent } from './like-commentary-update.component';

@Injectable({ providedIn: 'root' })
export class LikeCommentaryResolve implements Resolve<ILikeCommentary> {
  constructor(private service: LikeCommentaryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILikeCommentary> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((likeCommentary: HttpResponse<LikeCommentary>) => {
          if (likeCommentary.body) {
            return of(likeCommentary.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new LikeCommentary());
  }
}

export const likeCommentaryRoute: Routes = [
  {
    path: '',
    component: LikeCommentaryComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'LikeCommentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LikeCommentaryDetailComponent,
    resolve: {
      likeCommentary: LikeCommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LikeCommentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LikeCommentaryUpdateComponent,
    resolve: {
      likeCommentary: LikeCommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LikeCommentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LikeCommentaryUpdateComponent,
    resolve: {
      likeCommentary: LikeCommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'LikeCommentaries',
    },
    canActivate: [UserRouteAccessService],
  },
];
