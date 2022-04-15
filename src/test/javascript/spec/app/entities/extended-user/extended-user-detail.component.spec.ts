import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { MydrawTestModule } from '../../../test.module';
import { ExtendedUserDetailComponent } from 'app/entities/extended-user/extended-user-detail.component';
import { ExtendedUser } from 'app/shared/model/extended-user.model';

describe('Component Tests', () => {
  describe('ExtendedUser Management Detail Component', () => {
    let comp: ExtendedUserDetailComponent;
    let fixture: ComponentFixture<ExtendedUserDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ extendedUser: new ExtendedUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [MydrawTestModule],
        declarations: [ExtendedUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ExtendedUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ExtendedUserDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load extendedUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.extendedUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
