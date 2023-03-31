import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteRoutingModule } from './paciente-routing.module';

import { PacientesComponent } from './paciente.component';
import { PacientesModalComponent } from './modal/paciente.modal.component';
import { NgxMaskPipe } from 'ngx-mask';
import { NgxMaskDirective } from 'ngx-mask';
import { provideNgxMask } from 'ngx-mask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteRoutingModule,
    NgxMaskPipe,
    NgxMaskDirective
  ],
  declarations: [PacientesComponent, PacientesModalComponent],
  exports: [PacientesComponent, PacientesModalComponent],
  providers: [provideNgxMask()]
})
export class PacienteModule {}
