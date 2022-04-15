import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'extended-user',
        loadChildren: () => import('./extended-user/extended-user.module').then(m => m.MydrawExtendedUserModule),
      },
      {
        path: 'album',
        loadChildren: () => import('./album/album.module').then(m => m.MydrawAlbumModule),
      },
      {
        path: 'image',
        loadChildren: () => import('./image/image.module').then(m => m.MydrawImageModule),
      },
      {
        path: 'background-color',
        loadChildren: () => import('./background-color/background-color.module').then(m => m.MydrawBackgroundColorModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.MydrawCategoryModule),
      },
      {
        path: 'commentary',
        loadChildren: () => import('./commentary/commentary.module').then(m => m.MydrawCommentaryModule),
      },
      {
        path: 'like-album',
        loadChildren: () => import('./like-album/like-album.module').then(m => m.MydrawLikeAlbumModule),
      },
      {
        path: 'like-commentary',
        loadChildren: () => import('./like-commentary/like-commentary.module').then(m => m.MydrawLikeCommentaryModule),
      },
      {
        path: 'dis-like-commentary',
        loadChildren: () => import('./dis-like-commentary/dis-like-commentary.module').then(m => m.MydrawDisLikeCommentaryModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class MydrawEntityModule {}
