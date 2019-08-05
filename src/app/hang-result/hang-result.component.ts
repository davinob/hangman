import { Component, OnInit } from '@angular/core';
import { HangManService } from '../hang-man.service';

@Component({
  selector: 'app-hang-result',
  templateUrl: './hang-result.component.html',
  styleUrls: ['./hang-result.component.css']
})
export class HangResultComponent implements OnInit {

 

  
  readonly hangSuccess:string="yes";
  readonly hangFailure:string="shit";
  readonly picSufix:string="_symbol.png";

  readonly failWords:Array<string>=["SHIT!","YOU","DIED",":("];
  readonly successWords:Array<string>=["YES","YOU","DID","IT!"];


  statusClass:string="";
  statusWords:Array<string>=null;
  pictureURL:string="";


  constructor(public hangService:HangManService) { }

  ngOnInit() {

    this.hangService.endGameStatus$.subscribe(gameStatus=>
      {
        if (gameStatus==this.hangService.FAIL_STATUS)
        {
          this.pictureURL=this.hangService.PICS_FOLDER+this.hangFailure+this.picSufix;
          this.statusWords=this.failWords;
          this.statusClass="failStatus";
         
        }
        else
        if (gameStatus==this.hangService.SUCCESS_STATUS)
        {
          this.pictureURL=this.hangService.PICS_FOLDER+this.hangSuccess+this.picSufix;
          this.statusWords=this.successWords;
          this.statusClass="successStatus";
          
        }
      });
  }



}
