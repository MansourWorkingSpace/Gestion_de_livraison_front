import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCommercantComponent } from './register-commercant.component';

describe('RegisterCommercantComponent', () => {
  let component: RegisterCommercantComponent;
  let fixture: ComponentFixture<RegisterCommercantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCommercantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCommercantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
