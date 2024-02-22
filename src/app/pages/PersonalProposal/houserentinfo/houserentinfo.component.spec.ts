import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouserentinfoComponent } from './houserentinfo.component';

describe('HouserentinfoComponent', () => {
  let component: HouserentinfoComponent;
  let fixture: ComponentFixture<HouserentinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouserentinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HouserentinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
