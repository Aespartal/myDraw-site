import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBackgroundColor, BackgroundColor } from 'app/shared/model/background-color.model';
import { BackgroundColorService } from './background-color.service';
import { BackgroundColorComponent } from './background-color.component';
import { BackgroundColorDetailComponent } from './background-color-detail.component';
import { BackgroundColorUpdateComponent } from './background-color-update.component';

@Injectable({ providedIn: 'root' })
export class BackgroundColorResolve implements Resolve<IBackgroundColor> {
  constructor(private service: BackgroundColorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBackgroundColor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((backgroundColor: HttpResponse<BackgroundColor>) => {
          if (backgroundColor.body) {
            return of(backgroundColor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BackgroundColor());
  }
}

export const backgroundColorRoute: Routes = [
  {
    path: '',
    component: BackgroundColorComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'BackgroundColors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: BackgroundColorDetailComponent,
    resolve: {
      backgroundColor: BackgroundColorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BackgroundColors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: BackgroundColorUpdateComponent,
    resolve: {
      backgroundColor: BackgroundColorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BackgroundColors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: BackgroundColorUpdateComponent,
    resolve: {
      backgroundColor: BackgroundColorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'BackgroundColors',
    },
    canActivate: [UserRouteAccessService],
  },
];
