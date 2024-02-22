import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MylistloanComponent } from './mylistloan.component';

describe('MylistloanComponent', () => {
  let component: MylistloanComponent;
  let fixture: ComponentFixture<MylistloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MylistloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MylistloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
