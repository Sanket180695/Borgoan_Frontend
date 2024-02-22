import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealestateResincomComponent } from './realestate-resincom.component';

describe('RealestateResincomComponent', () => {
  let component: RealestateResincomComponent;
  let fixture: ComponentFixture<RealestateResincomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealestateResincomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealestateResincomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
