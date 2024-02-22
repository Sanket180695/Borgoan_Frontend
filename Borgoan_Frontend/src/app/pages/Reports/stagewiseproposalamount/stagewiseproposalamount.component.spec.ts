import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagewiseproposalamountComponent } from './stagewiseproposalamount.component';

describe('StagewiseproposalamountComponent', () => {
  let component: StagewiseproposalamountComponent;
  let fixture: ComponentFixture<StagewiseproposalamountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagewiseproposalamountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagewiseproposalamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
