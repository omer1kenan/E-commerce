import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDatailsComponent } from './products-datails.component';

describe('ProductsDatailsComponent', () => {
  let component: ProductsDatailsComponent;
  let fixture: ComponentFixture<ProductsDatailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsDatailsComponent]
    });
    fixture = TestBed.createComponent(ProductsDatailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
