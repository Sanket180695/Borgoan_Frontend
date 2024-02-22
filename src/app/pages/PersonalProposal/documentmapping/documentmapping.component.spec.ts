import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentmappingComponent } from './documentmapping.component';

describe('DocumentmappingComponent', () => {
  let component: DocumentmappingComponent;
  let fixture: ComponentFixture<DocumentmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
