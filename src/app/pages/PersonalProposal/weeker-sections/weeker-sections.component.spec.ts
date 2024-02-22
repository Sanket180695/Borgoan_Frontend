import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekerSectionsComponent } from './weeker-sections.component';

describe('WeekerSectionsComponent', () => {
  let component: WeekerSectionsComponent;
  let fixture: ComponentFixture<WeekerSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekerSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekerSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
