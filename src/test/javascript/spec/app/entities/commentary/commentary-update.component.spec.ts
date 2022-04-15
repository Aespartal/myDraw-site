import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MydrawTestModule } from '../../../test.module';
import { CommentaryUpdateComponent } from 'app/entities/commentary/commentary-update.component';
import { CommentaryService } from 'app/entities/commentary/commentary.service';
import { Commentary } from 'app/shared/model/commentary.model';

describe('Component Tests', () => {
  describe('Commentary Management Update Component', () => {
    let comp: CommentaryUpdateComponent;
    let fixture: ComponentFixture<CommentaryUpdateComponent>;
    let service: CommentaryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [CommentaryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(CommentaryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(CommentaryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(CommentaryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Commentary(123);
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
        const entity = new Commentary();
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
