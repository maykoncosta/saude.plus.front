import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcedimentoPage } from './procedimento.page';

const routes: Routes = [
  {
    path: '',
    component: ProcedimentoPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcedimentoPageRoutingModule {}
