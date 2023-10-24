import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AutosComponent } from './pages/autosmarcas/autos/autos.component';
import { MarcasComponent } from './pages/autosmarcas/marcas/marcas.component';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { BreadcrumbsComponent } from './pages/breadcrumbs/breadcrumbs.component';
import { AppRoutingModule } from './app-routing.module';
import { PagesComponent } from './pages/pages.component';
import { FormsModule } from '@angular/forms';
import { MarcaService } from './service/marca.service';
import { AutoService } from './service/auto.service';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    DashboardComponent,
    AutosComponent,
    MarcasComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MarcaService, AutoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
