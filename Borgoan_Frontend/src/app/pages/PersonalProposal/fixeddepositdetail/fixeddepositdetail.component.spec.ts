import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixeddepositdetailComponent } from './fixeddepositdetail.component';

describe('FixeddepositdetailComponent', () => {
  let component: FixeddepositdetailComponent;
  let fixture: ComponentFixture<FixeddepositdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixeddepositdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixeddepositdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
