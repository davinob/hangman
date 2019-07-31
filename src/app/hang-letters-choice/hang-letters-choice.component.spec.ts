import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangLettersChoiceComponent } from './hang-letters-choice.component';

describe('HangLettersChoiceComponent', () => {
  let component: HangLettersChoiceComponent;
  let fixture: ComponentFixture<HangLettersChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangLettersChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HangLettersChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
