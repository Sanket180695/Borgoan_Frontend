import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasstomainbranchComponent } from './passtomainbranch.component';

describe('PasstomainbranchComponent', () => {
  let component: PasstomainbranchComponent;
  let fixture: ComponentFixture<PasstomainbranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasstomainbranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasstomainbranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
