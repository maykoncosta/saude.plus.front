import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedimentoPageRoutingModule } from './procedimento-routing.module';

import { ProcedimentoPage } from './procedimento.page';
import { ListagemProcedimentoComponent } from './listagem-procedimento/listagem-procedimento.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedimentoPageRoutingModule,
  ],
  declarations: [ProcedimentoPage, ListagemProcedimentoComponent],
  exports: [ListagemProcedimentoComponent, ProcedimentoPage]
})
export class ProcedimentoPageModule {}
