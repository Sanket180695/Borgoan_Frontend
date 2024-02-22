import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentgroupsComponent } from './documentgroups.component';

describe('DocumentgroupsComponent', () => {
  let component: DocumentgroupsComponent;
  let fixture: ComponentFixture<DocumentgroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentgroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentgroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
