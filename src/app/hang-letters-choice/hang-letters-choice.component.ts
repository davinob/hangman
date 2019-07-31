import { Component, OnInit } from '@angular/core';
import { HangManService, HangLetter } from '../hang-man.service';

export interface LetterChoice
{
  value:string;
  selected:boolean;
}

@Component({
  selector: 'app-hang-letters-choice',
  templateUrl: './hang-letters-choice.component.html',
  styleUrls: ['./hang-letters-choice.component.css']
})
export class HangLettersChoiceComponent implements OnInit {



  constructor(public hangService:HangManService) { }

  ngOnInit() {
  }


  tryLetter(letter:string)
  {

    if (this.hangService.getLetterInfo(letter).tried || this.hangService.isFinished())
    {
      console.log("letter "+letter+" already tried or game is over");
      return;
    }

    this.hangService.tryLetter(letter);
  }

  getSelectedClass(letter:string): string
  {
      return (this.hangService.getLetterInfo(letter).tried)? "choiceLetter selected": "choiceLetter";
  }


}
