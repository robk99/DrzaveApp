import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrzavaComponent } from './drzave-app/drzava/drzava.component';
import { GradComponent } from './drzave-app/grad/grad.component';
import { HttpErrorInterceptorService } from "./drzave-app/shared/services/http/http-error-interceptor.service";
import { DrzavaEditComponent } from './drzave-app/drzava/drzava-edit/drzava-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DrzavaComponent,
    GradComponent,
    DrzavaEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule,
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      cancelButtonType:"light", 
      confirmButtonType:"danger"
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
     useClass: HttpErrorInterceptorService,
     multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
