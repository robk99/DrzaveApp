import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from './drzave-app/country/country.component';
import { CityComponent } from './drzave-app/city/city.component';
import { CountryEditComponent } from './drzave-app/country/country-edit/country-edit.component';
import { environment } from '../environments/environment';
import { CityEditComponent } from './drzave-app/city/city-edit/city-edit.component';
import { LoginComponent } from './login/login-component/login.component';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from './guards/auth-guard.service';
import { RegisterComponent } from './register/register-component/register.component';
import { ErrorPageComponent } from './error-page/error-page.component';



export const ROUTES: Routes = [
  { path: '', redirectTo: `/${environment.homeRoute}`, pathMatch: 'full' },
  { path: `${environment.homeRoute}`, component:HomeComponent },
  { path: `${environment.loginRoute}`, component:LoginComponent },
  { path: `${environment.registerRoute}`, component:RegisterComponent },
  { path: `${environment.countriesRoute}`, component: CountryComponent, canActivate: [AuthGuard] },
  { path: `${environment.citiesRoute}`, component: CityComponent, canActivate: [AuthGuard] },
  { path: `${environment.countriesEditRoute}/:id`, component: CountryEditComponent, canActivate: [AuthGuard]},
  { path: `${environment.citiesEditRoute}/:id`, component: CityEditComponent, canActivate: [AuthGuard]},
  { path: `${environment.errorRoute}`, component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
