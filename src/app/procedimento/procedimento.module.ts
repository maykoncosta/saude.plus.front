import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcedimentoPageRoutingModule } from './procedimento-routing.module';

import { ProcedimentoPage } from './procedimento.page';
import { ListagemProcedimentoComponent } from './listagem-procedimento/listagem-procedimento.component';
import { ProcedimentoModalComponent } from './procedimento-modal/procedimento-modal.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcedimentoPageRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterLink
  ],
  declarations: [ProcedimentoPage, ListagemProcedimentoComponent, ProcedimentoModalComponent],
  exports: [ListagemProcedimentoComponent, ProcedimentoPage]
})
export class ProcedimentoPageModule {}
