import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardapprovalComponent } from './boardapproval.component';

describe('BoardapprovalComponent', () => {
  let component: BoardapprovalComponent;
  let fixture: ComponentFixture<BoardapprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardapprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
