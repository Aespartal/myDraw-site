import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILikeCommentary } from 'app/shared/model/like-commentary.model';
import { LikeCommentaryService } from './like-commentary.service';

@Component({
  templateUrl: './like-commentary-delete-dialog.component.html',
})
export class LikeCommentaryDeleteDialogComponent {
  likeCommentary?: ILikeCommentary;

  constructor(
    protected likeCommentaryService: LikeCommentaryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.likeCommentaryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('likeCommentaryListModification');
      this.activeModal.close();
    });
  }
}
