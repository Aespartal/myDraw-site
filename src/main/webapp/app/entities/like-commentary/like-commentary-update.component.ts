import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILikeCommentary, LikeCommentary } from 'app/shared/model/like-commentary.model';
import { LikeCommentaryService } from './like-commentary.service';
import { IExtendedUser } from 'app/shared/model/extended-user.model';
import { ExtendedUserService } from 'app/entities/extended-user/extended-user.service';
import { ICommentary } from 'app/shared/model/commentary.model';
import { CommentaryService } from 'app/entities/commentary/commentary.service';

type SelectableEntity = IExtendedUser | ICommentary;

@Component({
  selector: 'jhi-like-commentary-update',
  templateUrl: './like-commentary-update.component.html',
})
export class LikeCommentaryUpdateComponent implements OnInit {
  isSaving = false;
  extendedusers: IExtendedUser[] = [];
  commentaries: ICommentary[] = [];

  editForm = this.fb.group({
    id: [],
    extendedUserId: [null, Validators.required],
    comentaryId: [null, Validators.required],
  });

  constructor(
    protected likeCommentaryService: LikeCommentaryService,
    protected extendedUserService: ExtendedUserService,
    protected commentaryService: CommentaryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ likeCommentary }) => {
      this.updateForm(likeCommentary);

      this.extendedUserService.query().subscribe((res: HttpResponse<IExtendedUser[]>) => (this.extendedusers = res.body || []));

      this.commentaryService.query().subscribe((res: HttpResponse<ICommentary[]>) => (this.commentaries = res.body || []));
    });
  }

  updateForm(likeCommentary: ILikeCommentary): void {
    this.editForm.patchValue({
      id: likeCommentary.id,
      extendedUserId: likeCommentary.extendedUserId,
      comentaryId: likeCommentary.comentaryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const likeCommentary = this.createFromForm();
    if (likeCommentary.id !== undefined) {
      this.subscribeToSaveResponse(this.likeCommentaryService.update(likeCommentary));
    } else {
      this.subscribeToSaveResponse(this.likeCommentaryService.create(likeCommentary));
    }
  }

  private createFromForm(): ILikeCommentary {
    return {
      ...new LikeCommentary(),
      id: this.editForm.get(['id'])!.value,
      extendedUserId: this.editForm.get(['extendedUserId'])!.value,
      comentaryId: this.editForm.get(['comentaryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILikeCommentary>>): void {
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
