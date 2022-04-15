import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MydrawSharedModule } from 'app/shared/shared.module';
import { LikeCommentaryComponent } from './like-commentary.component';
import { LikeCommentaryDetailComponent } from './like-commentary-detail.component';
import { LikeCommentaryUpdateComponent } from './like-commentary-update.component';
import { LikeCommentaryDeleteDialogComponent } from './like-commentary-delete-dialog.component';
import { likeCommentaryRoute } from './like-commentary.route';

@NgModule({
  imports: [MydrawSharedModule, RouterModule.forChild(likeCommentaryRoute)],
  declarations: [
    LikeCommentaryComponent,
    LikeCommentaryDetailComponent,
    LikeCommentaryUpdateComponent,
    LikeCommentaryDeleteDialogComponent,
  ],
  entryComponents: [LikeCommentaryDeleteDialogComponent],
})
export class MydrawLikeCommentaryModule {}
