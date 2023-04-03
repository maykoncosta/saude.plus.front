import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PacientesModalComponent } from './paciente/modal/paciente.modal.component';
import { PacientesComponent } from './paciente/paciente.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'pacientes',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar',
    component: PacientesModalComponent
  },
  {
    path: 'pacientes',
    component: PacientesComponent
  },
  {
    path: 'procedimento',
    loadChildren: () => import('./procedimento/procedimento.module').then( m => m.ProcedimentoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
