import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExtendedUser, ExtendedUser } from 'app/shared/model/extended-user.model';
import { ExtendedUserService } from './extended-user.service';
import { ExtendedUserComponent } from './extended-user.component';
import { ExtendedUserDetailComponent } from './extended-user-detail.component';
import { ExtendedUserUpdateComponent } from './extended-user-update.component';

@Injectable({ providedIn: 'root' })
export class ExtendedUserResolve implements Resolve<IExtendedUser> {
  constructor(private service: ExtendedUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExtendedUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((extendedUser: HttpResponse<ExtendedUser>) => {
          if (extendedUser.body) {
            return of(extendedUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExtendedUser());
  }
}

export const extendedUserRoute: Routes = [
  {
    path: '',
    component: ExtendedUserComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'ExtendedUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ExtendedUserDetailComponent,
    resolve: {
      extendedUser: ExtendedUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ExtendedUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ExtendedUserUpdateComponent,
    resolve: {
      extendedUser: ExtendedUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ExtendedUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ExtendedUserUpdateComponent,
    resolve: {
      extendedUser: ExtendedUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'ExtendedUsers',
    },
    canActivate: [UserRouteAccessService],
  },
];
