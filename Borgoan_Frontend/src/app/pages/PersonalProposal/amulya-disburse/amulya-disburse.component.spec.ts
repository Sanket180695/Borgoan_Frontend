import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmulyaDisburseComponent } from './amulya-disburse.component';

describe('AmulyaDisburseComponent', () => {
  let component: AmulyaDisburseComponent;
  let fixture: ComponentFixture<AmulyaDisburseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmulyaDisburseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmulyaDisburseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
