import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDisLikeCommentary } from 'app/shared/model/dis-like-commentary.model';
import { DisLikeCommentaryService } from './dis-like-commentary.service';

@Component({
  templateUrl: './dis-like-commentary-delete-dialog.component.html',
})
export class DisLikeCommentaryDeleteDialogComponent {
  disLikeCommentary?: IDisLikeCommentary;

  constructor(
    protected disLikeCommentaryService: DisLikeCommentaryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.disLikeCommentaryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('disLikeCommentaryListModification');
      this.activeModal.close();
    });
  }
}
