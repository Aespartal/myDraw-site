import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { MydrawTestModule } from '../../../test.module';
import { DisLikeCommentaryComponent } from 'app/entities/dis-like-commentary/dis-like-commentary.component';
import { DisLikeCommentaryService } from 'app/entities/dis-like-commentary/dis-like-commentary.service';
import { DisLikeCommentary } from 'app/shared/model/dis-like-commentary.model';

describe('Component Tests', () => {
  describe('DisLikeCommentary Management Component', () => {
    let comp: DisLikeCommentaryComponent;
    let fixture: ComponentFixture<DisLikeCommentaryComponent>;
    let service: DisLikeCommentaryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [DisLikeCommentaryComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(DisLikeCommentaryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DisLikeCommentaryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DisLikeCommentaryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DisLikeCommentary(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.disLikeCommentaries && comp.disLikeCommentaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DisLikeCommentary(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.disLikeCommentaries && comp.disLikeCommentaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
