import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalloanComponent } from './personalloan.component';

describe('PersonalloanComponent', () => {
  let component: PersonalloanComponent;
  let fixture: ComponentFixture<PersonalloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
