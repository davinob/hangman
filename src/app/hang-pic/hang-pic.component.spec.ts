import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangPicComponent } from './hang-pic.component';

describe('HangPicComponent', () => {
  let component: HangPicComponent;
  let fixture: ComponentFixture<HangPicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangPicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangPicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
