import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestatemarkingtargetcompletionComponent } from './realestatemarkingtargetcompletion.component';

describe('RealestatemarkingtargetcompletionComponent', () => {
  let component: RealestatemarkingtargetcompletionComponent;
  let fixture: ComponentFixture<RealestatemarkingtargetcompletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestatemarkingtargetcompletionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestatemarkingtargetcompletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
