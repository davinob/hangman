import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangResultComponent } from './hang-result.component';

describe('HangResultComponent', () => {
  let component: HangResultComponent;
  let fixture: ComponentFixture<HangResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
