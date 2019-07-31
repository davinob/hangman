import { Component, OnInit } from '@angular/core';
import { HangManService } from '../hang-man.service';

@Component({
  selector: 'app-hang-pic',
  templateUrl: './hang-pic.component.html',
  styleUrls: ['./hang-pic.component.css']
})
export class HangPicComponent implements OnInit {


  PICSFOLDER:string="assets/pics/";
  picPrefix:string="Hangman ";
  picSufix:string=".png";


  constructor(public hangService:HangManService) { }

  ngOnInit() {
  }


  getHangPicture():string
  {
    let stepNum=this.hangService.MAXSTEPS-this.hangService.numberStepLeft+1;
    if (!stepNum)
      stepNum=1;

    return this.PICSFOLDER+this.picPrefix+stepNum+this.picSufix;
  }

}
