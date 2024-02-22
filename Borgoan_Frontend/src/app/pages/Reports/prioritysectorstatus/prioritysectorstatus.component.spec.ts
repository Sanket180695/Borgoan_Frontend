import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritysectorstatusComponent } from './prioritysectorstatus.component';

describe('PrioritysectorstatusComponent', () => {
  let component: PrioritysectorstatusComponent;
  let fixture: ComponentFixture<PrioritysectorstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritysectorstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritysectorstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
