import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MydrawTestModule } from '../../../test.module';
import { LikeCommentaryUpdateComponent } from 'app/entities/like-commentary/like-commentary-update.component';
import { LikeCommentaryService } from 'app/entities/like-commentary/like-commentary.service';
import { LikeCommentary } from 'app/shared/model/like-commentary.model';

describe('Component Tests', () => {
  describe('LikeCommentary Management Update Component', () => {
    let comp: LikeCommentaryUpdateComponent;
    let fixture: ComponentFixture<LikeCommentaryUpdateComponent>;
    let service: LikeCommentaryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [LikeCommentaryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(LikeCommentaryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LikeCommentaryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LikeCommentaryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LikeCommentary(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new LikeCommentary();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
