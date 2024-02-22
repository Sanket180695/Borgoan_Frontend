import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectrolepageComponent } from './selectrolepage.component';

describe('SelectrolepageComponent', () => {
  let component: SelectrolepageComponent;
  let fixture: ComponentFixture<SelectrolepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectrolepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectrolepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
