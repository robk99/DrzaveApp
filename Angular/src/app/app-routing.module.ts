import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrzavaComponent } from './drzave-app/drzava/drzava.component';
import { GradComponent } from './drzave-app/grad/grad.component';
import { DrzavaEditComponent } from './drzave-app/drzava/drzava-edit/drzava-edit.component';
import { environment } from '../environments/environment';
import { GradEditComponent } from './drzave-app/grad/grad-edit/grad-edit.component';
import { LoginComponent } from './login/login-component/login.component';
import { HomeComponent } from "./home/home.component";
import { AuthGuard } from './guards/auth-guard.service';



export const ROUTES: Routes = [
  { path: '', redirectTo: `/${environment.homeRoute}`, pathMatch: 'full' },
  { path: `${environment.homeRoute}`, component:HomeComponent },
  { path: `${environment.loginRoute}`, component:LoginComponent },
  { path: `${environment.drzaveRoute}`, component: DrzavaComponent, canActivate: [AuthGuard] },
  { path: `${environment.gradoviRoute}`, component: GradComponent, canActivate: [AuthGuard] },
  { path: `${environment.drzaveEditRoute}/:id`, component: DrzavaEditComponent, canActivate: [AuthGuard]},
  { path: `${environment.gradoviEditRoute}/:id`, component: GradEditComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
