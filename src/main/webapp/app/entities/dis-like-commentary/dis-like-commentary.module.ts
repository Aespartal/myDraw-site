import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MydrawSharedModule } from 'app/shared/shared.module';
import { DisLikeCommentaryComponent } from './dis-like-commentary.component';
import { DisLikeCommentaryDetailComponent } from './dis-like-commentary-detail.component';
import { DisLikeCommentaryUpdateComponent } from './dis-like-commentary-update.component';
import { DisLikeCommentaryDeleteDialogComponent } from './dis-like-commentary-delete-dialog.component';
import { disLikeCommentaryRoute } from './dis-like-commentary.route';

@NgModule({
  imports: [MydrawSharedModule, RouterModule.forChild(disLikeCommentaryRoute)],
  declarations: [
    DisLikeCommentaryComponent,
    DisLikeCommentaryDetailComponent,
    DisLikeCommentaryUpdateComponent,
    DisLikeCommentaryDeleteDialogComponent,
  ],
  entryComponents: [DisLikeCommentaryDeleteDialogComponent],
})
export class MydrawDisLikeCommentaryModule {}
