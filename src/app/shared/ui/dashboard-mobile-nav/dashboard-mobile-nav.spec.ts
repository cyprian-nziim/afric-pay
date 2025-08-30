import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMobileNavComponent } from './dashboard-mobile-nav.component';

describe('DashboardMobileNavComponent', () => {
  let component: DashboardMobileNavComponent;
  let fixture: ComponentFixture<DashboardMobileNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardMobileNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardMobileNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
