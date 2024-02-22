import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingListMicroComponent } from './pending-list-micro.component';

describe('PendingListMicroComponent', () => {
  let component: PendingListMicroComponent;
  let fixture: ComponentFixture<PendingListMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingListMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingListMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
