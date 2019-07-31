import { Component, OnInit } from '@angular/core';
import { HangManService } from '../hang-man.service';

@Component({
  selector: 'app-hang-result',
  templateUrl: './hang-result.component.html',
  styleUrls: ['./hang-result.component.css']
})
export class HangResultComponent implements OnInit {

 

  PICSFOLDER:string="assets/pics/";
  hangSuccess:string="yes";
  hangFailure:string="shit";
  picSufix:string="_symbol.png";

  message:string="";

  errorMessage:string="SHIT! YOU DIED :(";
  successMessage:string="YES YOU DID IT!";


  constructor(public hangService:HangManService) { }

  ngOnInit() {
  }


  getResultPicture():string
  {
    if (this.hangService.isFail())
    {
      this.message=this.errorMessage;
      return this.PICSFOLDER+this.hangFailure+this.picSufix;
    }
    else 
    {
      this.message=this.successMessage;
      return this.PICSFOLDER+this.hangSuccess+this.picSufix;
    }
  }
}
