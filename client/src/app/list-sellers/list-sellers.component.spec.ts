/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SellersService, Seller } from '../sellers.service';
import { Router } from '@angular/router';

import {Observable} from "rxjs/Rx";
import { FormsModule } from "@angular/forms";
import { NgbModal, NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';

import { ListSellersComponent } from './list-sellers.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

describe('ListSellersComponent', () => {

    // Mock class
  class SellersServiceMock {
    sellers = [];

    getSellers() : Observable<Object[]> {
      return Observable.of(this.sellers);
    };

    addSeller(newSeller: Seller): Observable<Seller> {
      return Observable.of(new Seller());
    }
  }

  let mockService = new SellersServiceMock();
  let component: ListSellersComponent;
  let fixture: ComponentFixture<ListSellersComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy("navigate")    
  };

  var mockModal = {
    seller: new Seller(),
    open: function() {
        return {
           result: {
                then: function(fn) {
                      // Þessi mun virka eins og notandinn ýti alltaf á OK:
                      fn();
                },
           },
          componentInstance: function() { 
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
    spyOn(mockModal, "open").and.callThrough();
    spyOn(mockService, "addSeller").and.callThrough();
  });
  

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of sellers if the backend returns a list', () => {
    expect(mockService.getSellers).toHaveBeenCalled();
  });

  it('should display a message if the list of sellers is empty', () => {
    // Arrange
    mockService.sellers = [];

    // Act
    component.ngOnInit();

    // Assert
    expect(component.sellersListEmpty).toBe(false);
  });

  it('should display an error message if the list cannot be retrieved', () => {

  });

  it('should display a modal dialog if the user tries to add a new seller', () => {
    // Act
    //component.addSeller();

    //expect(mockService.addSeller).toHaveBeenCalled();
  });

  it('should try to add a new seller if the modal dialog is closed using the OK button', () => {
    // spy on server.addSeller
  });

  it('should add the new seller to the list if the seller could be added', () => {
    // component.addSeller();
  });

  it('should display an error message if the seller could not be added', () => {
    // component.addSeller();
  });
  
});
