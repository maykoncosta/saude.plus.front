import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PacientesModalComponent } from './paciente/modal/paciente.modal.component';
import { PacientesComponent } from './paciente/paciente.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: '**',
    redirectTo: 'pacientes',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar',
    component: PacientesModalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pacientes',
    component: PacientesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'procedimentos',
    loadChildren: () => import('./procedimento/procedimento.module').then( m => m.ProcedimentoPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
