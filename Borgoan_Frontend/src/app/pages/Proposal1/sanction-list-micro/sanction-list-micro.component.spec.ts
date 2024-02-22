import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionListMicroComponent } from './sanction-list-micro.component';

describe('SanctionListMicroComponent', () => {
  let component: SanctionListMicroComponent;
  let fixture: ComponentFixture<SanctionListMicroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionListMicroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionListMicroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
