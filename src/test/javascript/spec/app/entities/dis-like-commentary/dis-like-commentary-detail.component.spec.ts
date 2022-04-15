import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MydrawTestModule } from '../../../test.module';
import { DisLikeCommentaryDetailComponent } from 'app/entities/dis-like-commentary/dis-like-commentary-detail.component';
import { DisLikeCommentary } from 'app/shared/model/dis-like-commentary.model';

describe('Component Tests', () => {
  describe('DisLikeCommentary Management Detail Component', () => {
    let comp: DisLikeCommentaryDetailComponent;
    let fixture: ComponentFixture<DisLikeCommentaryDetailComponent>;
    const route = ({ data: of({ disLikeCommentary: new DisLikeCommentary(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [DisLikeCommentaryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DisLikeCommentaryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DisLikeCommentaryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load disLikeCommentary on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.disLikeCommentary).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
