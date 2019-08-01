import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';



export interface HangLetter
{
  fromMovie:boolean
  revealedFromInit:boolean;
  revealedFromUser:boolean;
  tried:boolean
}

export interface HashMan {
  [letter: string] : HangLetter;
} 

@Injectable({
  providedIn: 'root'
})
export class HangManService {

   readonly MAX_STEPS:number=6;
   readonly MOVIES_URL:string="assets/data/movies.json";
   readonly PERCENT_OF_LETTERS_TO_REVEAL:number=0.25;
  

   moviesList:Array<string>;
   alphabet:Array<string>=new Array();


   movieWordsList:Array<Array<string>>;
   numberStepLeft:number;  
   numberLettersLeft:number;
   lettersHashMap:HashMan={};
  
  readonly RUNNING_STATUS:string="running";
  readonly FAIL_STATUS:string="fail";
  readonly SUCCESS_STATUS:string="success";
  endGameStatus$:BehaviorSubject<string>=new BehaviorSubject("runningStatus");
  


  constructor(private http: HttpClient) { 
    this.init();
  }


  async init()
  {
    await this.initMoviesList();
    this.initAlphabet();

    this.startGame();
  }


  initAlphabet()
  {
    for (let i:number=0;i<26;i++)
    {
      let theChar:string=String.fromCharCode('A'.charCodeAt(0) + i);
      this.alphabet.push(theChar);
    }
  }


  initLettersHashMap()
  {
      this.alphabet.forEach(letter=>
        {
          let hangLetter:HangLetter={revealedFromInit:false,revealedFromUser:false, fromMovie:false,tried:false};
          this.lettersHashMap[letter]=hangLetter;
        });
  }



  startGame()
  {
    this.movieWordsList=new Array();
    this.numberStepLeft=this.MAX_STEPS;
    this.initLettersHashMap();
   

    let random=Math.floor(Math.random()*this.moviesList.length);
    let movieChosen:string=this.moviesList[random];
    
    this.numberLettersLeft=0;
    let setOfLetters:Set<string>=new Set();
    let wordLetters:Array<string>=new Array();
    
    for(let i:number=0;i<movieChosen.length;i++)
    {
      let char:string=movieChosen.charAt(i).toUpperCase();
      if (char!=" ")
      {
        wordLetters.push(char);
       
        if (!this.lettersHashMap[char].fromMovie) //letter not yet seen
        {
          setOfLetters.add(char);
          this.lettersHashMap[char].fromMovie=true;
          this.numberLettersLeft++;
       }
      }
      else
      {
        this.movieWordsList.push(wordLetters); 
        wordLetters=new Array();
      }
      
      
    }
    this.movieWordsList.push(wordLetters); 


    let numToReveal:number=Math.round(setOfLetters.size * this.PERCENT_OF_LETTERS_TO_REVEAL); 
    this.numberLettersLeft-=numToReveal;

    for(let i:number=0;i<numToReveal;i++)
    {
      let randomIndex=Math.floor(Math.random()*setOfLetters.size);
      let randomLetter:string=Array.from(setOfLetters.values())[randomIndex];

      setOfLetters.delete(randomLetter);
      this.lettersHashMap[randomLetter].revealedFromInit=true;
      this.lettersHashMap[randomLetter].tried=true;
     }
 
  }



  tryLetter(letter:string)
  {
    this.lettersHashMap[letter].tried=true;

    if (this.lettersHashMap[letter].fromMovie)
    {
      this.lettersHashMap[letter].revealedFromUser=true;
      this.numberLettersLeft--;
    }
    else
    {
      this.numberStepLeft--;
    }

    let currentStatus:string=this.endGameStatus$.value;
    let newStatus=(!this.isFinished())?this.RUNNING_STATUS:(this.isFail())?this.FAIL_STATUS:this.SUCCESS_STATUS;
  
    if (currentStatus!=newStatus)
    {
      this.endGameStatus$.next(newStatus);
    }

  }

  getLetterInfo(letter:string):HangLetter
  {
    return this.lettersHashMap[letter];
  }

  isFinished():boolean
  {
    return this.numberStepLeft==0 || this.numberLettersLeft==0;
  }

  isFail():boolean
  {
    return this.numberStepLeft==0;
  }


  async initMoviesList() {
  let moviesCompleteList:Array<any>=await this.http.get<any>(this.MOVIES_URL).toPromise();
  this.moviesList=moviesCompleteList.map(movie=>movie.title);
  } 


  
}
