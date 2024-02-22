import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldItemComponent } from './gold-item.component';

describe('GoldItemComponent', () => {
  let component: GoldItemComponent;
  let fixture: ComponentFixture<GoldItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
