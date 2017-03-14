/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellersService } from '../sellers.service';
import { Router } from '@angular/router';

import {Observable} from "rxjs/Rx";
import { FormsModule } from "@angular/forms";
import { NgbModal, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

import { ListSellersComponent } from './list-sellers.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

describe('ListSellersComponent', () => {

    // Mock class
  class SellersServiceMock {

    getSellers() : Observable<Object[]> {
      return Observable.of([]);
    }
  }

  let mockService = new SellersServiceMock();
  let component: ListSellersComponent;
  let fixture: ComponentFixture<ListSellersComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy("navigate")    
  };

  var mockModal = {
    open: function() {
        return {
           result: {
                then: function(fn) {
                      // Þessi mun virka eins og notandinn ýti alltaf á OK:
                      fn();
                }
           }
       }
    } 
  };

  let mockToast = {
    setRootViewContainerRef: function() {

    }   
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSellersComponent ],
      imports: [FormsModule],
    providers: [{
                provide: SellersService,
                useValue: mockService },
              {
                provide: Router,
                useValue: mockRouter },
              {
                provide: NgbModal,
                useValue: mockModal },
              {
                provide: ToastsManager,
                useValue: mockToast
              }, {
                provide: NgbTabsetConfig,
                useValue: mockModal
              }
              ]})
    .compileComponents();
  }));


  beforeEach(() => {
    // add spys here
    spyOn(mockService, "getSellers").and.callThrough();
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   //All our unit tests 

  it('should display a list of sellers if the backend returns a list', () => {
    expect(mockService.getSellers).toHaveBeenCalled();
  });

/*
  it('should display a message if the list of sellers is empty', () => {
    // TODO klára þetta
  });

  it('should display an error message if the list cannot be retrieved', () => {
    // TODO klára þetta
  });

  it('should display a modal dialog if the user tries to add a new seller', () => {
    // TODO klára þetta
  });

  it('should try to add a new seller if the modal dialog is closed using the OK button', () => {
    // TODO klára þetta
    // spy on server.addSeller
  });

  it('should NOT try to add a new seller if the modal dialog is closed in any other way', () => {
    // TODO klára þetta
  });

  it('should add the new seller to the list if the seller could be added', () => {
    // TODO klára þetta
  });

  it('should display an error message if the seller could not be added', () => {
    // TODO klára þetta
  });
*/
});
