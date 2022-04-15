import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICommentary, Commentary } from 'app/shared/model/commentary.model';
import { CommentaryService } from './commentary.service';
import { IExtendedUser } from 'app/shared/model/extended-user.model';
import { ExtendedUserService } from 'app/entities/extended-user/extended-user.service';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album/album.service';

type SelectableEntity = IExtendedUser | IAlbum;

@Component({
  selector: 'jhi-commentary-update',
  templateUrl: './commentary-update.component.html',
})
export class CommentaryUpdateComponent implements OnInit {
  isSaving = false;
  extendedusers: IExtendedUser[] = [];
  albums: IAlbum[] = [];

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    dateCreated: [null, [Validators.required]],
    dateModified: [],
    isModified: [],
    extendedUserId: [null, Validators.required],
    albumId: [null, Validators.required],
  });

  constructor(
    protected commentaryService: CommentaryService,
    protected extendedUserService: ExtendedUserService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commentary }) => {
      if (!commentary.id) {
        const today = moment().startOf('day');
        commentary.dateCreated = today;
        commentary.dateModified = today;
      }

      this.updateForm(commentary);

      this.extendedUserService.query().subscribe((res: HttpResponse<IExtendedUser[]>) => (this.extendedusers = res.body || []));

      this.albumService.query().subscribe((res: HttpResponse<IAlbum[]>) => (this.albums = res.body || []));
    });
  }

  updateForm(commentary: ICommentary): void {
    this.editForm.patchValue({
      id: commentary.id,
      description: commentary.description,
      dateCreated: commentary.dateCreated ? commentary.dateCreated.format(DATE_TIME_FORMAT) : null,
      dateModified: commentary.dateModified ? commentary.dateModified.format(DATE_TIME_FORMAT) : null,
      isModified: commentary.isModified,
      extendedUserId: commentary.extendedUserId,
      albumId: commentary.albumId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commentary = this.createFromForm();
    if (commentary.id !== undefined) {
      this.subscribeToSaveResponse(this.commentaryService.update(commentary));
    } else {
      this.subscribeToSaveResponse(this.commentaryService.create(commentary));
    }
  }

  private createFromForm(): ICommentary {
    return {
      ...new Commentary(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value
        ? moment(this.editForm.get(['dateCreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      dateModified: this.editForm.get(['dateModified'])!.value
        ? moment(this.editForm.get(['dateModified'])!.value, DATE_TIME_FORMAT)
        : undefined,
      isModified: this.editForm.get(['isModified'])!.value,
      extendedUserId: this.editForm.get(['extendedUserId'])!.value,
      albumId: this.editForm.get(['albumId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommentary>>): void {
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
