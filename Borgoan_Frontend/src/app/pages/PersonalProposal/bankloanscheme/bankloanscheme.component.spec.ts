import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankloanschemeComponent } from './bankloanscheme.component';

describe('BankloanschemeComponent', () => {
  let component: BankloanschemeComponent;
  let fixture: ComponentFixture<BankloanschemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankloanschemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankloanschemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
