import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedListComponent } from './rejected-list.component';

describe('RejectedListComponent', () => {
  let component: RejectedListComponent;
  let fixture: ComponentFixture<RejectedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
