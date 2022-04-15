import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MydrawSharedModule } from 'app/shared/shared.module';
import { BackgroundColorComponent } from './background-color.component';
import { BackgroundColorDetailComponent } from './background-color-detail.component';
import { BackgroundColorUpdateComponent } from './background-color-update.component';
import { BackgroundColorDeleteDialogComponent } from './background-color-delete-dialog.component';
import { backgroundColorRoute } from './background-color.route';

@NgModule({
  imports: [MydrawSharedModule, RouterModule.forChild(backgroundColorRoute)],
  declarations: [
    BackgroundColorComponent,
    BackgroundColorDetailComponent,
    BackgroundColorUpdateComponent,
    BackgroundColorDeleteDialogComponent,
  ],
  entryComponents: [BackgroundColorDeleteDialogComponent],
})
export class MydrawBackgroundColorModule {}
