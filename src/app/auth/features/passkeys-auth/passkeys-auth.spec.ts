import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasskeysAuth } from './passkeys-auth';

describe('PasskeysAuth', () => {
  let component: PasskeysAuth;
  let fixture: ComponentFixture<PasskeysAuth>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasskeysAuth]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasskeysAuth);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
