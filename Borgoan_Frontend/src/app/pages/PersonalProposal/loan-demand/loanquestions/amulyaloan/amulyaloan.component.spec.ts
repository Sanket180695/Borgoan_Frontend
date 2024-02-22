import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmulyaloanComponent } from './amulyaloan.component';

describe('AmulyaloanComponent', () => {
  let component: AmulyaloanComponent;
  let fixture: ComponentFixture<AmulyaloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmulyaloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmulyaloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
