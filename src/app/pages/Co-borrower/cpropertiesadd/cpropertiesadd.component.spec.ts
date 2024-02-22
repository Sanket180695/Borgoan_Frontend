import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpropertiesaddComponent } from './cpropertiesadd.component';

describe('CpropertiesaddComponent', () => {
  let component: CpropertiesaddComponent;
  let fixture: ComponentFixture<CpropertiesaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpropertiesaddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpropertiesaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
