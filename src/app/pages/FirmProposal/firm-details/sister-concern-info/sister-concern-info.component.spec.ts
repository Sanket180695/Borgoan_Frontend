import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SisterConcernInfoComponent } from './sister-concern-info.component';

describe('SisterConcernInfoComponent', () => {
  let component: SisterConcernInfoComponent;
  let fixture: ComponentFixture<SisterConcernInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SisterConcernInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SisterConcernInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
