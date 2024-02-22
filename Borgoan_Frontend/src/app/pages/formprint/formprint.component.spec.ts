import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormprintComponent } from './formprint.component';

describe('FormprintComponent', () => {
  let component: FormprintComponent;
  let fixture: ComponentFixture<FormprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
