import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartExpiryPopupComponent } from './cart-expiry-popup.component';

describe('CartExpiryPopupComponent', () => {
  let component: CartExpiryPopupComponent;
  let fixture: ComponentFixture<CartExpiryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartExpiryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartExpiryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
