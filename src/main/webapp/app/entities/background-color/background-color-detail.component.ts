import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBackgroundColor } from 'app/shared/model/background-color.model';

@Component({
  selector: 'jhi-background-color-detail',
  templateUrl: './background-color-detail.component.html',
})
export class BackgroundColorDetailComponent implements OnInit {
  backgroundColor: IBackgroundColor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ backgroundColor }) => (this.backgroundColor = backgroundColor));
  }

  previousState(): void {
    window.history.back();
  }
}
