import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritysectorloanComponent } from './prioritysectorloan.component';

describe('PrioritysectorloanComponent', () => {
  let component: PrioritysectorloanComponent;
  let fixture: ComponentFixture<PrioritysectorloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritysectorloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritysectorloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
