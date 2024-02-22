import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkreadComponent } from './linkread.component';

describe('LinkreadComponent', () => {
  let component: LinkreadComponent;
  let fixture: ComponentFixture<LinkreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
