import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsreportComponent } from './documentsreport.component';

describe('DocumentsreportComponent', () => {
  let component: DocumentsreportComponent;
  let fixture: ComponentFixture<DocumentsreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
