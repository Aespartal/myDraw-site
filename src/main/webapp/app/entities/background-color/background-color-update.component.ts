import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBackgroundColor, BackgroundColor } from 'app/shared/model/background-color.model';
import { BackgroundColorService } from './background-color.service';

@Component({
  selector: 'jhi-background-color-update',
  templateUrl: './background-color-update.component.html',
})
export class BackgroundColorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    code: [null, [Validators.required]],
  });

  constructor(
    protected backgroundColorService: BackgroundColorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ backgroundColor }) => {
      this.updateForm(backgroundColor);
    });
  }

  updateForm(backgroundColor: IBackgroundColor): void {
    this.editForm.patchValue({
      id: backgroundColor.id,
      name: backgroundColor.name,
      code: backgroundColor.code,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const backgroundColor = this.createFromForm();
    if (backgroundColor.id !== undefined) {
      this.subscribeToSaveResponse(this.backgroundColorService.update(backgroundColor));
    } else {
      this.subscribeToSaveResponse(this.backgroundColorService.create(backgroundColor));
    }
  }

  private createFromForm(): IBackgroundColor {
    return {
      ...new BackgroundColor(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      code: this.editForm.get(['code'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBackgroundColor>>): void {
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
}
