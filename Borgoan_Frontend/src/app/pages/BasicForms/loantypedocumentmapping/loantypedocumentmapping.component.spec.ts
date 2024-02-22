import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantypedocumentmappingComponent } from './loantypedocumentmapping.component';

describe('LoantypedocumentmappingComponent', () => {
  let component: LoantypedocumentmappingComponent;
  let fixture: ComponentFixture<LoantypedocumentmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoantypedocumentmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantypedocumentmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
