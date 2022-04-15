import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CommentaryService } from 'app/entities/commentary/commentary.service';
import { ICommentary, Commentary } from 'app/shared/model/commentary.model';

describe('Service Tests', () => {
  describe('Commentary Service', () => {
    let injector: TestBed;
    let service: CommentaryService;
    let httpMock: HttpTestingController;
    let elemDefault: ICommentary;
    let expectedResult: ICommentary | ICommentary[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(CommentaryService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Commentary(0, 'AAAAAAA', currentDate, currentDate, false);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Commentary', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateModified: currentDate,
          },
          returnedFromService
        );

        service.create(new Commentary()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Commentary', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            isModified: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateModified: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Commentary', () => {
        const returnedFromService = Object.assign(
          {
            description: 'BBBBBB',
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            isModified: true,
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateModified: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Commentary', () => {
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
