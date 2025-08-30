import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLanguage } from './change-language';

describe('ChangeLanguage', () => {
  let component: ChangeLanguage;
  let fixture: ComponentFixture<ChangeLanguage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeLanguage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeLanguage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
