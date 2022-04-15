import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IAlbum, Album } from 'app/shared/model/album.model';
import { AlbumService } from './album.service';
import { IExtendedUser } from 'app/shared/model/extended-user.model';
import { ExtendedUserService } from 'app/entities/extended-user/extended-user.service';
import { ICategory } from 'app/shared/model/category.model';
import { CategoryService } from 'app/entities/category/category.service';

type SelectableEntity = IExtendedUser | ICategory;

@Component({
  selector: 'jhi-album-update',
  templateUrl: './album-update.component.html',
})
export class AlbumUpdateComponent implements OnInit {
  isSaving = false;
  extendedusers: IExtendedUser[] = [];
  categories: ICategory[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.maxLength(3500)]],
    image: [null, [Validators.required]],
    imageContentType: [null, [Validators.required]],
    order: [null, [Validators.required]],
    date: [null, [Validators.required]],
    extendedUserId: [null, Validators.required],
    categoryId: [null, Validators.required],
  });

  constructor(
    protected albumService: AlbumService,
    protected extendedUserService: ExtendedUserService,
    protected categoryService: CategoryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ album }) => {
      if (!album.id) {
        const today = moment().startOf('day');
        album.date = today;
      }

      this.updateForm(album);

      this.extendedUserService.query().subscribe((res: HttpResponse<IExtendedUser[]>) => (this.extendedusers = res.body || []));

      this.categoryService.query().subscribe((res: HttpResponse<ICategory[]>) => (this.categories = res.body || []));
    });
  }

  updateForm(album: IAlbum): void {
    this.editForm.patchValue({
      id: album.id,
      name: album.name,
      description: album.description,
      image: album.image,
      imageContentType: album.imageContentType,
      order: album.order,
      date: album.date ? album.date.format(DATE_TIME_FORMAT) : null,
      extendedUserId: album.extendedUserId,
      categoryId: album.categoryId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const album = this.createFromForm();
    if (album.id !== undefined) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  private createFromForm(): IAlbum {
    return {
      ...new Album(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      image: this.editForm.get(['image'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      order: this.editForm.get(['order'])!.value,
      date: this.editForm.get(['date'])!.value ? moment(this.editForm.get(['date'])!.value, DATE_TIME_FORMAT) : undefined,
      extendedUserId: this.editForm.get(['extendedUserId'])!.value,
      categoryId: this.editForm.get(['categoryId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbum>>): void {
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
