import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IExtendedUser } from 'app/shared/model/extended-user.model';

@Component({
  selector: 'jhi-extended-user-detail',
  templateUrl: './extended-user-detail.component.html',
})
export class ExtendedUserDetailComponent implements OnInit {
  extendedUser: IExtendedUser | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ extendedUser }) => (this.extendedUser = extendedUser));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
