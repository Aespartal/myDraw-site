import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDisLikeCommentary, DisLikeCommentary } from 'app/shared/model/dis-like-commentary.model';
import { DisLikeCommentaryService } from './dis-like-commentary.service';
import { DisLikeCommentaryComponent } from './dis-like-commentary.component';
import { DisLikeCommentaryDetailComponent } from './dis-like-commentary-detail.component';
import { DisLikeCommentaryUpdateComponent } from './dis-like-commentary-update.component';

@Injectable({ providedIn: 'root' })
export class DisLikeCommentaryResolve implements Resolve<IDisLikeCommentary> {
  constructor(private service: DisLikeCommentaryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDisLikeCommentary> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((disLikeCommentary: HttpResponse<DisLikeCommentary>) => {
          if (disLikeCommentary.body) {
            return of(disLikeCommentary.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DisLikeCommentary());
  }
}

export const disLikeCommentaryRoute: Routes = [
  {
    path: '',
    component: DisLikeCommentaryComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'DisLikeCommentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DisLikeCommentaryDetailComponent,
    resolve: {
      disLikeCommentary: DisLikeCommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DisLikeCommentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DisLikeCommentaryUpdateComponent,
    resolve: {
      disLikeCommentary: DisLikeCommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DisLikeCommentaries',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DisLikeCommentaryUpdateComponent,
    resolve: {
      disLikeCommentary: DisLikeCommentaryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DisLikeCommentaries',
    },
    canActivate: [UserRouteAccessService],
  },
];
