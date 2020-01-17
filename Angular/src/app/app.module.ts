import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputDrzavaComponent } from './drzave-app/drzava/input-drzava/input-drzava.component';
import { ListaDrzavaComponent } from './drzave-app/drzava/lista-drzava/lista-drzava.component';
import { InputGradovaComponent } from './drzave-app/grad/input-gradova/input-gradova.component';
import { ListaGradovaComponent } from './drzave-app/grad/lista-gradova/lista-gradova.component';
import { DrzaveAppComponent } from './drzave-app/drzave-app.component';
import { DrzavaComponent } from './drzave-app/drzava/drzava.component';
import { GradComponent } from './drzave-app/grad/grad.component';
import { DrzavaService } from "./drzave-app/shared/drzava/drzava.service";
import { GradService } from "./drzave-app/shared/grad/grad.service";

@NgModule({
  declarations: [
    AppComponent,
    InputDrzavaComponent,
    ListaDrzavaComponent,
    InputGradovaComponent,
    ListaGradovaComponent,
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
    ToastrModule
  ],
  providers: [DrzavaService, GradService],
  bootstrap: [AppComponent]
})
export class AppModule { }
