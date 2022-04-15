import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtendedUser } from 'app/shared/model/extended-user.model';
import { ExtendedUserService } from './extended-user.service';

@Component({
  templateUrl: './extended-user-delete-dialog.component.html',
})
export class ExtendedUserDeleteDialogComponent {
  extendedUser?: IExtendedUser;

  constructor(
    protected extendedUserService: ExtendedUserService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.extendedUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('extendedUserListModification');
      this.activeModal.close();
    });
  }
}
