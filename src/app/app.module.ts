import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TabsComponent } from './tabs/tabs';
import { RouterLink } from '@angular/router';
import { HomePageModule } from './home/home.module';
import { PacienteModule } from './paciente/paciente.module';

@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule, HttpClientModule, RouterLink, HomePageModule,
    PacienteModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
