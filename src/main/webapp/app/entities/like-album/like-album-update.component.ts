import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILikeAlbum, LikeAlbum } from 'app/shared/model/like-album.model';
import { LikeAlbumService } from './like-album.service';
import { IExtendedUser } from 'app/shared/model/extended-user.model';
import { ExtendedUserService } from 'app/entities/extended-user/extended-user.service';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album/album.service';

type SelectableEntity = IExtendedUser | IAlbum;

@Component({
  selector: 'jhi-like-album-update',
  templateUrl: './like-album-update.component.html',
})
export class LikeAlbumUpdateComponent implements OnInit {
  isSaving = false;
  extendedusers: IExtendedUser[] = [];
  albums: IAlbum[] = [];

  editForm = this.fb.group({
    id: [],
    extendedUserId: [null, Validators.required],
    albumId: [null, Validators.required],
  });

  constructor(
    protected likeAlbumService: LikeAlbumService,
    protected extendedUserService: ExtendedUserService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ likeAlbum }) => {
      this.updateForm(likeAlbum);

      this.extendedUserService.query().subscribe((res: HttpResponse<IExtendedUser[]>) => (this.extendedusers = res.body || []));

      this.albumService.query().subscribe((res: HttpResponse<IAlbum[]>) => (this.albums = res.body || []));
    });
  }

  updateForm(likeAlbum: ILikeAlbum): void {
    this.editForm.patchValue({
      id: likeAlbum.id,
      extendedUserId: likeAlbum.extendedUserId,
      albumId: likeAlbum.albumId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const likeAlbum = this.createFromForm();
    if (likeAlbum.id !== undefined) {
      this.subscribeToSaveResponse(this.likeAlbumService.update(likeAlbum));
    } else {
      this.subscribeToSaveResponse(this.likeAlbumService.create(likeAlbum));
    }
  }

  private createFromForm(): ILikeAlbum {
    return {
      ...new LikeAlbum(),
      id: this.editForm.get(['id'])!.value,
      extendedUserId: this.editForm.get(['extendedUserId'])!.value,
      albumId: this.editForm.get(['albumId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILikeAlbum>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
