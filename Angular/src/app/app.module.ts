import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputDrzavaComponent } from './drzave-app/drzava/input-drzava/input-drzava.component';
import { ListaDrzavaComponent } from './drzave-app/drzava/lista-drzava/lista-drzava.component';
import { InputGradovaComponent } from './drzave-app/grad/input-gradova/input-gradova.component';
import { ListaGradovaComponent } from './drzave-app/grad/lista-gradova/lista-gradova.component';
import { DrzaveAppComponent } from './drzave-app/drzave-app.component';
import { DrzavaComponent } from './drzave-app/drzava/drzava.component';
import { GradComponent } from './drzave-app/grad/grad.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
