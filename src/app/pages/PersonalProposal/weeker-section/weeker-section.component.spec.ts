import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekerSectionComponent } from './weeker-section.component';

describe('WeekerSectionComponent', () => {
  let component: WeekerSectionComponent;
  let fixture: ComponentFixture<WeekerSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekerSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
