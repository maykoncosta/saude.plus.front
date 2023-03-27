import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';

import { HomePageRoutingModule } from './home-routing.module';
import { ProcedimentoPageModule } from '../procedimento/procedimento.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot({}),
    HomePageRoutingModule,
    HttpClientModule,
    RouterLink,
    RouterModule,
    ProcedimentoPageModule
  ],
  declarations: [HomePage
    ],
  exports: []
})
export class HomePageModule {}
