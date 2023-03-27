import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { PacientesModalComponent } from '../paciente/modal/paciente.modal.component';
import { PacientesComponent } from '../paciente/paciente.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'cadastrar',
    component: PacientesModalComponent
  },
  {
    path: 'pacientes',
    component: PacientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
