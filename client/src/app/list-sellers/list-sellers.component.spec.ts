/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListSellersComponent } from './list-sellers.component';

describe('ListSellersComponent', () => {
  let component: ListSellersComponent;
  let fixture: ComponentFixture<ListSellersComponent>;

  const mockService = {
    getSellerList: function() {

    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSellersComponent ]
    })
    .compileComponents();
  }));

  // add spys here
  spyOn(mockService, "getSellerList").and.callThrough();

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* All our unit tests */

  it('should display a list of sellers if the backend returns a list', () => {
    // TODO klára þetta

    // expect(mockService.getSellerList).toHaveBeenCalled();
  });

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

});
