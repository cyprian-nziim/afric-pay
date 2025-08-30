import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplashLoader } from './splash-loader.component';

describe('SplashLoader', () => {
  let component: SplashLoader;
  let fixture: ComponentFixture<SplashLoader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplashLoader],
    }).compileComponents();

    fixture = TestBed.createComponent(SplashLoader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
