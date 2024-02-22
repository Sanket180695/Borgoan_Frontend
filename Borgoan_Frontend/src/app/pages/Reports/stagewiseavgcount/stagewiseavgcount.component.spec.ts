import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StagewiseavgcountComponent } from './stagewiseavgcount.component';

describe('StagewiseavgcountComponent', () => {
  let component: StagewiseavgcountComponent;
  let fixture: ComponentFixture<StagewiseavgcountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StagewiseavgcountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StagewiseavgcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
