import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproposaldocumentComponent } from './addproposaldocument.component';

describe('AddproposaldocumentComponent', () => {
  let component: AddproposaldocumentComponent;
  let fixture: ComponentFixture<AddproposaldocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddproposaldocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproposaldocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
