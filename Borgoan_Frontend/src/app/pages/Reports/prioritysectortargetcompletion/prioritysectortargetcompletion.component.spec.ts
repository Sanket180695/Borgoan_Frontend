import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritysectortargetcompletionComponent } from './prioritysectortargetcompletion.component';

describe('PrioritysectortargetcompletionComponent', () => {
  let component: PrioritysectortargetcompletionComponent;
  let fixture: ComponentFixture<PrioritysectortargetcompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritysectortargetcompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritysectortargetcompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
