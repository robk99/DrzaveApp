import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountryComponent } from './drzave-app/country/country.component';
import { CityComponent } from './drzave-app/city/city.component';
import { HttpErrorInterceptorService } from "./drzave-app/shared/services/http/http-error-interceptor.service";
import { CountryEditComponent } from './drzave-app/country/country-edit/country-edit.component';
import { CityEditComponent } from './drzave-app/city/city-edit/city-edit.component';
import { LoginComponent } from './login/login-component/login.component';
import { HomeComponent } from "./home/home.component";
import { JwtModule } from "@auth0/angular-jwt";
import { environment } from "../environments/environment";
import { RegisterComponent } from './register/register.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}


@NgModule({
  declarations: [
    AppComponent,
    CountryComponent,
    CityComponent,
    CountryEditComponent,
    CityEditComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    ConfirmationPopoverModule.forRoot({
      cancelButtonType:"light", 
      confirmButtonType:"danger"
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.whitelistedDomain],
        blacklistedRoutes: []
      }
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
