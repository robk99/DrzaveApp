import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrzaveAppComponent } from './drzave-app/drzave-app.component';
import { DrzavaComponent } from './drzave-app/drzava/drzava.component';
import { GradComponent } from './drzave-app/grad/grad.component';
import { DrzavaService } from "./drzave-app/shared/drzava/drzava.service";
import { GradService } from "./drzave-app/shared/grad/grad.service";

@NgModule({
  declarations: [
    AppComponent,
    DrzaveAppComponent,
    DrzavaComponent,
    GradComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
  ],
  providers: [DrzavaService, GradService],
  bootstrap: [AppComponent]
})
export class AppModule { }
