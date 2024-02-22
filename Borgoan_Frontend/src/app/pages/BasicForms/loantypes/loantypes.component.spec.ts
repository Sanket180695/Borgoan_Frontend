import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantypesComponent } from './loantypes.component';

describe('LoantypesComponent', () => {
  let component: LoantypesComponent;
  let fixture: ComponentFixture<LoantypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
