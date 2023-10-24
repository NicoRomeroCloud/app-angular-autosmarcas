import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AutosComponent } from './pages/autosmarcas/autos/autos.component';
import { MarcasComponent } from './pages/autosmarcas/marcas/marcas.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {

    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/autos', component: AutosComponent },
      { path: 'dashboard/marcas', component: MarcasComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

    ]

  },




  { path: '**', component: NotfoundComponent }


]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
