import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraInformationListComponent } from './extra-information-list.component';

describe('ExtraInformationListComponent', () => {
  let component: ExtraInformationListComponent;
  let fixture: ComponentFixture<ExtraInformationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraInformationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
