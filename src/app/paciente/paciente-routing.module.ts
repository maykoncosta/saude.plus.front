import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PacientesModalComponent } from './modal/paciente.modal.component';

import { PacientesComponent } from './paciente.component';

const routes: Routes = [
  {
    path: '',
    component: PacientesComponent
  },
  {
    path: 'modal',
    component: PacientesModalComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteRoutingModule {}
