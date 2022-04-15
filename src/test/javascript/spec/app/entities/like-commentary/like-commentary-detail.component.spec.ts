import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MydrawTestModule } from '../../../test.module';
import { LikeCommentaryDetailComponent } from 'app/entities/like-commentary/like-commentary-detail.component';
import { LikeCommentary } from 'app/shared/model/like-commentary.model';

describe('Component Tests', () => {
  describe('LikeCommentary Management Detail Component', () => {
    let comp: LikeCommentaryDetailComponent;
    let fixture: ComponentFixture<LikeCommentaryDetailComponent>;
    const route = ({ data: of({ likeCommentary: new LikeCommentary(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [LikeCommentaryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LikeCommentaryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LikeCommentaryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load likeCommentary on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.likeCommentary).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
