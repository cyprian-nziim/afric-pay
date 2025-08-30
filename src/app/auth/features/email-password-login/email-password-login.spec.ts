import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPasswordLogin } from './email-password-login';

describe('EmailPasswordLogin', () => {
  let component: EmailPasswordLogin;
  let fixture: ComponentFixture<EmailPasswordLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailPasswordLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailPasswordLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
