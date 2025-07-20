import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploiComponent } from './emploi.component';

describe('EmploiComponent', () => {
  let component: EmploiComponent;
  let fixture: ComponentFixture<EmploiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
