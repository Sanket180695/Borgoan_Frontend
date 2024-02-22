import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldItemsComponent } from './gold-items.component';

describe('GoldItemsComponent', () => {
  let component: GoldItemsComponent;
  let fixture: ComponentFixture<GoldItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
