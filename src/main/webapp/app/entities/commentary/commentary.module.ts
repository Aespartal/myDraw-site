import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MydrawSharedModule } from 'app/shared/shared.module';
import { CommentaryComponent } from './commentary.component';
import { CommentaryDetailComponent } from './commentary-detail.component';
import { CommentaryUpdateComponent } from './commentary-update.component';
import { CommentaryDeleteDialogComponent } from './commentary-delete-dialog.component';
import { commentaryRoute } from './commentary.route';

@NgModule({
  imports: [MydrawSharedModule, RouterModule.forChild(commentaryRoute)],
  declarations: [CommentaryComponent, CommentaryDetailComponent, CommentaryUpdateComponent, CommentaryDeleteDialogComponent],
  entryComponents: [CommentaryDeleteDialogComponent],
})
export class MydrawCommentaryModule {}
