import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MydrawTestModule } from '../../../test.module';
import { DisLikeCommentaryUpdateComponent } from 'app/entities/dis-like-commentary/dis-like-commentary-update.component';
import { DisLikeCommentaryService } from 'app/entities/dis-like-commentary/dis-like-commentary.service';
import { DisLikeCommentary } from 'app/shared/model/dis-like-commentary.model';

describe('Component Tests', () => {
  describe('DisLikeCommentary Management Update Component', () => {
    let comp: DisLikeCommentaryUpdateComponent;
    let fixture: ComponentFixture<DisLikeCommentaryUpdateComponent>;
    let service: DisLikeCommentaryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [DisLikeCommentaryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(DisLikeCommentaryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DisLikeCommentaryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DisLikeCommentaryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DisLikeCommentary(123);
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
        const entity = new DisLikeCommentary();
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
