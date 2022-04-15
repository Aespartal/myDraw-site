import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { MydrawTestModule } from '../../../test.module';
import { BackgroundColorDetailComponent } from 'app/entities/background-color/background-color-detail.component';
import { BackgroundColor } from 'app/shared/model/background-color.model';

describe('Component Tests', () => {
  describe('BackgroundColor Management Detail Component', () => {
    let comp: BackgroundColorDetailComponent;
    let fixture: ComponentFixture<BackgroundColorDetailComponent>;
    const route = ({ data: of({ backgroundColor: new BackgroundColor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [BackgroundColorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(BackgroundColorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(BackgroundColorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load backgroundColor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.backgroundColor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
