import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { MydrawTestModule } from '../../../test.module';
import { LikeAlbumComponent } from 'app/entities/like-album/like-album.component';
import { LikeAlbumService } from 'app/entities/like-album/like-album.service';
import { LikeAlbum } from 'app/shared/model/like-album.model';

describe('Component Tests', () => {
  describe('LikeAlbum Management Component', () => {
    let comp: LikeAlbumComponent;
    let fixture: ComponentFixture<LikeAlbumComponent>;
    let service: LikeAlbumService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [LikeAlbumComponent],
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
        .overrideTemplate(LikeAlbumComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeAlbumComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeAlbumService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LikeAlbum(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.likeAlbums && comp.likeAlbums[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LikeAlbum(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.likeAlbums && comp.likeAlbums[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
