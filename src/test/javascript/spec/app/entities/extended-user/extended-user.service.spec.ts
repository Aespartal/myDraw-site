import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ExtendedUserService } from 'app/entities/extended-user/extended-user.service';
import { IExtendedUser, ExtendedUser } from 'app/shared/model/extended-user.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

describe('Service Tests', () => {
  describe('ExtendedUser Service', () => {
    let injector: TestBed;
    let service: ExtendedUserService;
    let httpMock: HttpTestingController;
    let elemDefault: IExtendedUser;
    let expectedResult: IExtendedUser | IExtendedUser[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ExtendedUserService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new ExtendedUser(0, 'AAAAAAA', currentDate, 'AAAAAAA', 'image/png', 'AAAAAAA', Gender.MEN);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            birthdate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ExtendedUser', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            birthdate: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate,
          },
          returnedFromService
        );

        service.create(new ExtendedUser()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ExtendedUser', () => {
        const returnedFromService = Object.assign(
          {
            telephone: 'BBBBBB',
            birthdate: currentDate.format(DATE_FORMAT),
            description: 'BBBBBB',
            imageCover: 'BBBBBB',
            gender: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ExtendedUser', () => {
        const returnedFromService = Object.assign(
          {
            telephone: 'BBBBBB',
            birthdate: currentDate.format(DATE_FORMAT),
            description: 'BBBBBB',
            imageCover: 'BBBBBB',
            gender: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthdate: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ExtendedUser', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
