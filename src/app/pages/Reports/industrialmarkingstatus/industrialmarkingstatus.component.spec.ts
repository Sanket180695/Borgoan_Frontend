import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialmarkingstatusComponent } from './industrialmarkingstatus.component';

describe('IndustrialmarkingstatusComponent', () => {
  let component: IndustrialmarkingstatusComponent;
  let fixture: ComponentFixture<IndustrialmarkingstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrialmarkingstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrialmarkingstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
