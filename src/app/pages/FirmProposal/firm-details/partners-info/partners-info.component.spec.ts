import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersInfoComponent } from './partners-info.component';

describe('PartnersInfoComponent', () => {
  let component: PartnersInfoComponent;
  let fixture: ComponentFixture<PartnersInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
