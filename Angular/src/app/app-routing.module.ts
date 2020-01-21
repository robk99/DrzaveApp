import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DrzavaComponent } from './drzave-app/drzava/drzava.component';
import { GradComponent } from './drzave-app/grad/grad.component';




export const ROUTES: Routes = [
  { path: '', redirectTo: '/drzave', pathMatch: 'full' },
  { path: 'drzave', component: DrzavaComponent},
  { path: 'gradovi', component: GradComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
