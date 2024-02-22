import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesettingComponent } from './pagesetting.component';

describe('PagesettingComponent', () => {
  let component: PagesettingComponent;
  let fixture: ComponentFixture<PagesettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
