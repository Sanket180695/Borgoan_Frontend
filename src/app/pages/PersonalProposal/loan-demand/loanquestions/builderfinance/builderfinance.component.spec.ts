import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuilderfinanceComponent } from './builderfinance.component';

describe('BuilderfinanceComponent', () => {
  let component: BuilderfinanceComponent;
  let fixture: ComponentFixture<BuilderfinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuilderfinanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuilderfinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
