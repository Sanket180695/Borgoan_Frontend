import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedinfoComponent } from './detailedinfo.component';

describe('DetailedinfoComponent', () => {
  let component: DetailedinfoComponent;
  let fixture: ComponentFixture<DetailedinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
