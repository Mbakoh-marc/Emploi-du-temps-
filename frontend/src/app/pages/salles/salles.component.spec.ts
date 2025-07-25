import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesComponent } from './salles.component';

describe('SallesComponent', () => {
  let component: SallesComponent;
  let fixture: ComponentFixture<SallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SallesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
