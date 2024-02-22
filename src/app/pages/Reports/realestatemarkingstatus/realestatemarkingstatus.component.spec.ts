import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestatemarkingstatusComponent } from './realestatemarkingstatus.component';

describe('RealestatemarkingstatusComponent', () => {
  let component: RealestatemarkingstatusComponent;
  let fixture: ComponentFixture<RealestatemarkingstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestatemarkingstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestatemarkingstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
