import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { MydrawTestModule } from '../../../test.module';
import { BackgroundColorUpdateComponent } from 'app/entities/background-color/background-color-update.component';
import { BackgroundColorService } from 'app/entities/background-color/background-color.service';
import { BackgroundColor } from 'app/shared/model/background-color.model';

describe('Component Tests', () => {
  describe('BackgroundColor Management Update Component', () => {
    let comp: BackgroundColorUpdateComponent;
    let fixture: ComponentFixture<BackgroundColorUpdateComponent>;
    let service: BackgroundColorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [BackgroundColorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(BackgroundColorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BackgroundColorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BackgroundColorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new BackgroundColor(123);
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
        const entity = new BackgroundColor();
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
