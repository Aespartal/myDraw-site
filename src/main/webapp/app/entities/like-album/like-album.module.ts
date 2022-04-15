import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MydrawSharedModule } from 'app/shared/shared.module';
import { LikeAlbumComponent } from './like-album.component';
import { LikeAlbumDetailComponent } from './like-album-detail.component';
import { LikeAlbumUpdateComponent } from './like-album-update.component';
import { LikeAlbumDeleteDialogComponent } from './like-album-delete-dialog.component';
import { likeAlbumRoute } from './like-album.route';

@NgModule({
  imports: [MydrawSharedModule, RouterModule.forChild(likeAlbumRoute)],
  declarations: [LikeAlbumComponent, LikeAlbumDetailComponent, LikeAlbumUpdateComponent, LikeAlbumDeleteDialogComponent],
  entryComponents: [LikeAlbumDeleteDialogComponent],
})
export class MydrawLikeAlbumModule {}
