import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IImage, Image } from 'app/shared/model/image.model';
import { ImageService } from './image.service';
import { IAlbum } from 'app/shared/model/album.model';
import { AlbumService } from 'app/entities/album/album.service';

@Component({
  selector: 'jhi-image-update',
  templateUrl: './image-update.component.html',
})
export class ImageUpdateComponent implements OnInit {
  isSaving = false;
  albums: IAlbum[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [],
    image: [null, [Validators.required]],
    imageContentType: [null, [Validators.required]],
    albumId: [null, Validators.required],
  });

  constructor(
    protected imageService: ImageService,
    protected albumService: AlbumService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ image }) => {
      this.updateForm(image);

      this.albumService.query().subscribe((res: HttpResponse<IAlbum[]>) => (this.albums = res.body || []));
    });
  }

  updateForm(image: IImage): void {
    this.editForm.patchValue({
      id: image.id,
      name: image.name,
      description: image.description,
      image: image.image,
      imageContentType: image.imageContentType,
      albumId: image.albumId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const image = this.createFromForm();
    if (image.id !== undefined) {
      this.subscribeToSaveResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveResponse(this.imageService.create(image));
    }
  }

  private createFromForm(): IImage {
    return {
      ...new Image(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      image: this.editForm.get(['image'])!.value,
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      albumId: this.editForm.get(['albumId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>): void {
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

  trackById(index: number, item: IAlbum): any {
    return item.id;
  }
}
