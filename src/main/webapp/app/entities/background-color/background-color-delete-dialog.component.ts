import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBackgroundColor } from 'app/shared/model/background-color.model';
import { BackgroundColorService } from './background-color.service';

@Component({
  templateUrl: './background-color-delete-dialog.component.html',
})
export class BackgroundColorDeleteDialogComponent {
  backgroundColor?: IBackgroundColor;

  constructor(
    protected backgroundColorService: BackgroundColorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.backgroundColorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('backgroundColorListModification');
      this.activeModal.close();
    });
  }
}
