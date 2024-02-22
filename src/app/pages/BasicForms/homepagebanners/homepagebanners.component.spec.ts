import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepagebannersComponent } from './homepagebanners.component';

describe('HomepagebannersComponent', () => {
  let component: HomepagebannersComponent;
  let fixture: ComponentFixture<HomepagebannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepagebannersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepagebannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
