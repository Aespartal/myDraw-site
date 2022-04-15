import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MydrawTestModule } from '../../../test.module';
import { CommentaryDetailComponent } from 'app/entities/commentary/commentary-detail.component';
import { Commentary } from 'app/shared/model/commentary.model';

describe('Component Tests', () => {
  describe('Commentary Management Detail Component', () => {
    let comp: CommentaryDetailComponent;
    let fixture: ComponentFixture<CommentaryDetailComponent>;
    const route = ({ data: of({ commentary: new Commentary(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [CommentaryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(CommentaryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(CommentaryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load commentary on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.commentary).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
