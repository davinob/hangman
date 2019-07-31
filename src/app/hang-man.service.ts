import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



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

   MAXSTEPS:number=6;
   MOVIESURL:string="assets/data/movies.json";
   PERCENTOFLETTERSTOREVEAL:number=0.25;
  

   moviesList:Array<string>;
   alphabet:Array<string>=new Array();


   movieWordsList:Array<Array<string>>;
   numberStepLeft:number;  
   numberLettersLeft:number;
   lettersHashMap:HashMan={};
  

  


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
    this.numberStepLeft=this.MAXSTEPS;
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


    let numToReveal:number=Math.round(setOfLetters.size * this.PERCENTOFLETTERSTOREVEAL); 
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
  let moviesCompleteList:Array<any>=await this.http.get<any>(this.MOVIESURL).toPromise();
  this.moviesList=moviesCompleteList.map(movie=>movie.title);
  } 


  
}
