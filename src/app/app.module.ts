import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TabsComponent } from './tabs/tabs';
import { PacienteModule } from './paciente/paciente.module';
import { JwtInterceptor } from './JwtInterceptor';
import { LoginModule } from './login/login.module';
import { ProcedimentoPageModule } from './procedimento/procedimento.module';
import { NotificationModule } from './notification/notification.module';

@NgModule({
  declarations: [AppComponent, TabsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    PacienteModule,
    LoginModule,
    ProcedimentoPageModule,
    NotificationModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
