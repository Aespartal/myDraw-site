import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICommentary } from 'app/shared/model/commentary.model';
import { CommentaryService } from './commentary.service';

@Component({
  templateUrl: './commentary-delete-dialog.component.html',
})
export class CommentaryDeleteDialogComponent {
  commentary?: ICommentary;

  constructor(
    protected commentaryService: CommentaryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.commentaryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('commentaryListModification');
      this.activeModal.close();
    });
  }
}
