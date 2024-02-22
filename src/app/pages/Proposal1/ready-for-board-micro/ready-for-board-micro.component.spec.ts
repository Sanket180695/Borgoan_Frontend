import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyForBoardMicroComponent } from './ready-for-board-micro.component';

describe('ReadyForBoardMicroComponent', () => {
  let component: ReadyForBoardMicroComponent;
  let fixture: ComponentFixture<ReadyForBoardMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadyForBoardMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyForBoardMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
