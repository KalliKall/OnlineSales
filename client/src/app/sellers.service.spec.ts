/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SellersService } from './sellers.service';
import { Http } from '@angular/http';

describe('SellersService', () => {

  let service: SellersService;

  const mockHttp = {
    get: jasmine.createSpy('get')
  };

  beforeEach(() => {
    	TestBed.configureTestingModule({
        declarations: [ SellersService ],
        providers: [{
          provide: Http,
          uservalue: mockHttp
        }]
      })
  });

/*
  it('should ...', inject([SellersService], (service: SellersService) => {
    expect(service).toBeTruthy();
  // }));*/

  // out unit tests
  it('should try to issue a HTTP GET request when asked for a list of sellers', () => {
    // Act
    //service.getSellers();

    //expect(mockHttp.get).toHaveBeenCalled();
  });

  it('should try to issue a HTTP POST request when trying to add a new seller', () => {
    // service.addSeller();

    // expect(mockHTTP.get).toHaveBeenCalled();
  });
});
