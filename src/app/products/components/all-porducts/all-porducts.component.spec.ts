import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPorductsComponent } from './all-porducts.component';

describe('AllPorductsComponent', () => {
  let component: AllPorductsComponent;
  let fixture: ComponentFixture<AllPorductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPorductsComponent]
    });
    fixture = TestBed.createComponent(AllPorductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
