import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteRoutingModule } from './paciente-routing.module';

import { PacientesComponent } from './paciente.component';
import { PacientesModalComponent } from './modal/paciente.modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteRoutingModule,
  ],
  declarations: [PacientesComponent, PacientesModalComponent],
  exports: [PacientesComponent, PacientesModalComponent]
})
export class PacienteModule {}
