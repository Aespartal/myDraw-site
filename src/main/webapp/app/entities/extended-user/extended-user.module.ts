import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MydrawSharedModule } from 'app/shared/shared.module';
import { ExtendedUserComponent } from './extended-user.component';
import { ExtendedUserDetailComponent } from './extended-user-detail.component';
import { ExtendedUserUpdateComponent } from './extended-user-update.component';
import { ExtendedUserDeleteDialogComponent } from './extended-user-delete-dialog.component';
import { extendedUserRoute } from './extended-user.route';

@NgModule({
  imports: [MydrawSharedModule, RouterModule.forChild(extendedUserRoute)],
  declarations: [ExtendedUserComponent, ExtendedUserDetailComponent, ExtendedUserUpdateComponent, ExtendedUserDeleteDialogComponent],
  entryComponents: [ExtendedUserDeleteDialogComponent],
})
export class MydrawExtendedUserModule {}
