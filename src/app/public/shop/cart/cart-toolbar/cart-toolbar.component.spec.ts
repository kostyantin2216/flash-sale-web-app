import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartToolbarComponent } from './cart-toolbar.component';

describe('CartToolbarComponent', () => {
  let component: CartToolbarComponent;
  let fixture: ComponentFixture<CartToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
