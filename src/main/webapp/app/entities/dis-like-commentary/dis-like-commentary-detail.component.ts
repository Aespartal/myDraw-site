import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisLikeCommentary } from 'app/shared/model/dis-like-commentary.model';

@Component({
  selector: 'jhi-dis-like-commentary-detail',
  templateUrl: './dis-like-commentary-detail.component.html',
})
export class DisLikeCommentaryDetailComponent implements OnInit {
  disLikeCommentary: IDisLikeCommentary | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disLikeCommentary }) => (this.disLikeCommentary = disLikeCommentary));
  }

  previousState(): void {
    window.history.back();
  }
}
