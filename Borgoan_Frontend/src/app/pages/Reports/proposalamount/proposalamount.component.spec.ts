import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalamountComponent } from './proposalamount.component';

describe('ProposalamountComponent', () => {
  let component: ProposalamountComponent;
  let fixture: ComponentFixture<ProposalamountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalamountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalamountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
