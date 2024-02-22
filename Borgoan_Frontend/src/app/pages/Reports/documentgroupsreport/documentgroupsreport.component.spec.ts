import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentgroupsreportComponent } from './documentgroupsreport.component';

describe('DocumentgroupsreportComponent', () => {
  let component: DocumentgroupsreportComponent;
  let fixture: ComponentFixture<DocumentgroupsreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentgroupsreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentgroupsreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
