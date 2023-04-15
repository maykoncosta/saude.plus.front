import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from './paciente.service';
import { PacienteService } from './paciente.service';
import { PacientesModalComponent } from './modal/paciente.modal.component';
import { ModalController, IonModal } from '@ionic/angular';


@Component({
  selector: 'app-pacientes',
  templateUrl: 'paciente.component.html',
  styleUrls: ['paciente.component.scss'],
})
export class PacientesComponent implements OnInit {
  paciente: Paciente = new Paciente();
  pacientes!: any;
  dataNascimento!: String;
  nome!: string;
  celular!: string;
  cns!: Number;
  fotoPaciente!: string;
  exibirModal = false;

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private pacienteService: PacienteService, private modalController: ModalController) { }

  ngOnInit() {
    this.obterTodosPacientes();
  }


  setAbrirModal(abrir: boolean) {
    this.exibirModal = abrir;
  }

  obterObjeto() {
    this.paciente.nome = this.nome;
    this.paciente.dataNascimento = this.dataNascimento;
    this.paciente.celular = this.celular;
    this.paciente.cns = this.cns;
    this.paciente.fotoPaciente = this.fotoPaciente;
  }


  obterTodosPacientes() {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      console.log(pacientes);
      this.pacientes = pacientes;
    });
  }

  async openPacienteModal(paciente?: Paciente) {
    const modal = await this.modalController.create({
      component: PacientesModalComponent,
      componentProps: {
        paciente: paciente
      },
      cssClass: 'custom-modal',
    });
    await modal.present();
    
    const { data } = await modal.onDidDismiss();

    if (data) {
      this.obterTodosPacientes();
    }
  }

  deletePaciente(index: number) {
    const paciente = this.pacientes[index];

    this.pacienteService.deletePaciente(paciente.id).subscribe(() => {
      this.pacientes.splice(index, 1);
    });
  }

  //  filtro(event: Event) {
  //    const filterValue = (event.target as HTMLInputElement).value;
  //    console.log(filterValue);
  //    this.dataSource.filter = filterValue.trim().toLowerCase();
  //  }
}
