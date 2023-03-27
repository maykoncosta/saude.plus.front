import { Component } from '@angular/core';
import { PacientesModalComponent } from '../paciente/modal/paciente.modal.component';
import { PacientesComponent } from '../paciente/paciente.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pacienteModal = PacientesModalComponent;
  pacientes = PacientesComponent;
  constructor(private navCtrl: NavController) { }
  teste = 'teste';

  irParaPaciente(){
    this.navCtrl.navigateForward('pacientes');
  }
}
