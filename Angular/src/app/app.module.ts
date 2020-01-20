import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrzavaComponent } from './drzave-app/drzava/drzava.component';
import { GradComponent } from './drzave-app/grad/grad.component';
import { DrzavaService } from "./drzave-app/shared/drzava/drzava.service";
import { GradService } from "./drzave-app/shared/grad/grad.service";

@NgModule({
  declarations: [
    AppComponent,
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
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    })
  ],
  providers: [DrzavaService, GradService],
  bootstrap: [AppComponent]
})
export class AppModule { }
