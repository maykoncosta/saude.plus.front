import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from './paciente.service';
import { PacienteService } from './paciente.service';
import { PacientesModalComponent } from './modal/paciente.modal.component';
import { ModalController, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../notification.service';


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
  observacao!: string;
  celular!: string;
  cns!: Number;
  fotoPaciente!: string;
  exibirModal = false;
  filteredPacientes: Paciente[] = [];
  searchTerm = '';
  page: number = 1;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private pacienteService: PacienteService,
    private modalController: ModalController,
    private router: Router,
    private notification: NotificationService) { }

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
    this.paciente.observacao = this.observacao;
  }


  obterTodosPacientes() {
    this.pacienteService.getPacientes().subscribe(pacientes => {
      console.log('obter todos');
      this.pacientes = pacientes;
      this.filteredPacientes = pacientes;
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

    if (data?.updated) {
      await this.obterTodosPacientes();
    }

  }

  deletePaciente(pacienteId: number) {
    this.pacienteService.deletePaciente(pacienteId).subscribe(res => {
      this.obterTodosPacientes();
      this.notification.showSuccess("Paciente Excluido com Sucesso!");
    },
      err => {
        this.notification.showSuccess("Erro ao Excluir Paciente.");
      });
  }

  filterPacientes() {
    this.filteredPacientes = this.pacientes.filter(
      (paciente: any) =>
        paciente.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        paciente.celular.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        paciente.cns.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.page = 1;
    if (!this.filteredPacientes) {
      this.filteredPacientes = this.pacientes;
    }
  }

  navegarParaProcedimentos(pacienteId: number) {
    this.router.navigate(['/procedimentos', pacienteId]);
  }

}
