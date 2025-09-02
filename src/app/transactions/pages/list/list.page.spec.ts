import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListPage } from './list.page';

describe('TransactionsListPage', () => {
  let component: TransactionsListPage;
  let fixture: ComponentFixture<TransactionsListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
