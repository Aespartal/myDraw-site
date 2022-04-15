import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { MydrawTestModule } from '../../../test.module';
import { LikeCommentaryComponent } from 'app/entities/like-commentary/like-commentary.component';
import { LikeCommentaryService } from 'app/entities/like-commentary/like-commentary.service';
import { LikeCommentary } from 'app/shared/model/like-commentary.model';

describe('Component Tests', () => {
  describe('LikeCommentary Management Component', () => {
    let comp: LikeCommentaryComponent;
    let fixture: ComponentFixture<LikeCommentaryComponent>;
    let service: LikeCommentaryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [LikeCommentaryComponent],
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
        .overrideTemplate(LikeCommentaryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeCommentaryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeCommentaryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LikeCommentary(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.likeCommentaries && comp.likeCommentaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LikeCommentary(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.likeCommentaries && comp.likeCommentaries[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
