import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrzavaComponent } from './drzave-app/drzava/drzava.component';
import { GradComponent } from './drzave-app/grad/grad.component';
import { DrzavaEditComponent } from './drzave-app/drzava/drzava-edit/drzava-edit.component';
import { environment } from '../environments/environment';
import { GradEditComponent } from './drzave-app/grad/grad-edit/grad-edit.component';


export const ROUTES: Routes = [
  { path: '', redirectTo: '/drzave', pathMatch: 'full' },
  { path: 'drzave', component: DrzavaComponent},
  { path: 'gradovi', component: GradComponent },
  { path: `${environment.drzaveEditRoute}/:id`, component: DrzavaEditComponent},
  { path: `${environment.gradoviEditRoute}/:id`, component: GradEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
