import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClientComponent } from './dashboard-client.component';

describe('DashbordClientComponent', () => {
  let component: DashboardClientComponent;
  let fixture: ComponentFixture<DashboardClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardClientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
