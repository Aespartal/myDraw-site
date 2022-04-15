import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IExtendedUser, ExtendedUser } from 'app/shared/model/extended-user.model';
import { ExtendedUserService } from './extended-user.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IBackgroundColor } from 'app/shared/model/background-color.model';
import { BackgroundColorService } from 'app/entities/background-color/background-color.service';

type SelectableEntity = IUser | IBackgroundColor;

@Component({
  selector: 'jhi-extended-user-update',
  templateUrl: './extended-user-update.component.html',
})
export class ExtendedUserUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  backgroundcolors: IBackgroundColor[] = [];
  birthdateDp: any;

  editForm = this.fb.group({
    id: [],
    telephone: [],
    birthdate: [null, [Validators.required]],
    description: [null, [Validators.maxLength(3500)]],
    imageCover: [],
    imageCoverContentType: [],
    gender: [null, [Validators.required]],
    userId: [],
    backgroundColorId: [null, Validators.required],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected extendedUserService: ExtendedUserService,
    protected userService: UserService,
    protected backgroundColorService: BackgroundColorService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extendedUser }) => {
      this.updateForm(extendedUser);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.backgroundColorService.query().subscribe((res: HttpResponse<IBackgroundColor[]>) => (this.backgroundcolors = res.body || []));
    });
  }

  updateForm(extendedUser: IExtendedUser): void {
    this.editForm.patchValue({
      id: extendedUser.id,
      telephone: extendedUser.telephone,
      birthdate: extendedUser.birthdate,
      description: extendedUser.description,
      imageCover: extendedUser.imageCover,
      imageCoverContentType: extendedUser.imageCoverContentType,
      gender: extendedUser.gender,
      userId: extendedUser.userId,
      backgroundColorId: extendedUser.backgroundColorId,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('mydrawApp.error', { message: err.message })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const extendedUser = this.createFromForm();
    if (extendedUser.id !== undefined) {
      this.subscribeToSaveResponse(this.extendedUserService.update(extendedUser));
    } else {
      this.subscribeToSaveResponse(this.extendedUserService.create(extendedUser));
    }
  }

  private createFromForm(): IExtendedUser {
    return {
      ...new ExtendedUser(),
      id: this.editForm.get(['id'])!.value,
      telephone: this.editForm.get(['telephone'])!.value,
      birthdate: this.editForm.get(['birthdate'])!.value,
      description: this.editForm.get(['description'])!.value,
      imageCoverContentType: this.editForm.get(['imageCoverContentType'])!.value,
      imageCover: this.editForm.get(['imageCover'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      userId: this.editForm.get(['userId'])!.value,
      backgroundColorId: this.editForm.get(['backgroundColorId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtendedUser>>): void {
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
