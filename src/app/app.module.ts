import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HangLettersChoiceComponent } from './hang-letters-choice/hang-letters-choice.component';
import { HangResultComponent } from './hang-result/hang-result.component';
import { HangPicComponent } from './hang-pic/hang-pic.component';
import { HangFindComponent } from './hang-find/hang-find.component';

@NgModule({
  declarations: [
    AppComponent,
    HangLettersChoiceComponent,
    HangResultComponent,
    HangPicComponent,
    HangFindComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
