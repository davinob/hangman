import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangFindComponent } from './hang-find.component';

describe('HangFindComponent', () => {
  let component: HangFindComponent;
  let fixture: ComponentFixture<HangFindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangFindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
