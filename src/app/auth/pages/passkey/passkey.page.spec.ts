import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasskeyPage } from './passkey.page';

describe('PasskeyPage', () => {
  let component: PasskeyPage;
  let fixture: ComponentFixture<PasskeyPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasskeyPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasskeyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
