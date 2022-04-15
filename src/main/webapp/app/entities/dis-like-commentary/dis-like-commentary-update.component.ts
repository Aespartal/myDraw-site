import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDisLikeCommentary, DisLikeCommentary } from 'app/shared/model/dis-like-commentary.model';
import { DisLikeCommentaryService } from './dis-like-commentary.service';
import { IExtendedUser } from 'app/shared/model/extended-user.model';
import { ExtendedUserService } from 'app/entities/extended-user/extended-user.service';
import { ICommentary } from 'app/shared/model/commentary.model';
import { CommentaryService } from 'app/entities/commentary/commentary.service';

type SelectableEntity = IExtendedUser | ICommentary;

@Component({
  selector: 'jhi-dis-like-commentary-update',
  templateUrl: './dis-like-commentary-update.component.html',
})
export class DisLikeCommentaryUpdateComponent implements OnInit {
  isSaving = false;
  extendedusers: IExtendedUser[] = [];
  commentaries: ICommentary[] = [];

  editForm = this.fb.group({
    id: [],
    extendedUserId: [null, Validators.required],
    comentaryId: [null, Validators.required],
  });

  constructor(
    protected disLikeCommentaryService: DisLikeCommentaryService,
    protected extendedUserService: ExtendedUserService,
    protected commentaryService: CommentaryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disLikeCommentary }) => {
      this.updateForm(disLikeCommentary);

      this.extendedUserService.query().subscribe((res: HttpResponse<IExtendedUser[]>) => (this.extendedusers = res.body || []));

      this.commentaryService.query().subscribe((res: HttpResponse<ICommentary[]>) => (this.commentaries = res.body || []));
    });
  }

  updateForm(disLikeCommentary: IDisLikeCommentary): void {
    this.editForm.patchValue({
      id: disLikeCommentary.id,
      extendedUserId: disLikeCommentary.extendedUserId,
      comentaryId: disLikeCommentary.comentaryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disLikeCommentary = this.createFromForm();
    if (disLikeCommentary.id !== undefined) {
      this.subscribeToSaveResponse(this.disLikeCommentaryService.update(disLikeCommentary));
    } else {
      this.subscribeToSaveResponse(this.disLikeCommentaryService.create(disLikeCommentary));
    }
  }

  private createFromForm(): IDisLikeCommentary {
    return {
      ...new DisLikeCommentary(),
      id: this.editForm.get(['id'])!.value,
      extendedUserId: this.editForm.get(['extendedUserId'])!.value,
      comentaryId: this.editForm.get(['comentaryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisLikeCommentary>>): void {
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
