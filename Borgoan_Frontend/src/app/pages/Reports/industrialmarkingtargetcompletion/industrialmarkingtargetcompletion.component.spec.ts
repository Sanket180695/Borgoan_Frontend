import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialmarkingtargetcompletionComponent } from './industrialmarkingtargetcompletion.component';

describe('IndustrialmarkingtargetcompletionComponent', () => {
  let component: IndustrialmarkingtargetcompletionComponent;
  let fixture: ComponentFixture<IndustrialmarkingtargetcompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrialmarkingtargetcompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialmarkingtargetcompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
