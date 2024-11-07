import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './component/input/input.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CombinationComponent } from './component/combination/combination.component';
import { ButtonComponent } from './component/button/button.component';
import { PaginationComponent } from './component/pagination/pagination.component';
import { MainComponent } from './component/main/main.component';
import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    CombinationComponent,
    ButtonComponent,
    PaginationComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    PaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
