import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewAmulyaFormComponent } from './preview-amulya-form.component';

describe('PreviewAmulyaFormComponent', () => {
  let component: PreviewAmulyaFormComponent;
  let fixture: ComponentFixture<PreviewAmulyaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewAmulyaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewAmulyaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
