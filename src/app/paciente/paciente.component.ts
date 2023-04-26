import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente } from './paciente.service';
import { PacienteService } from './paciente.service';
import { PacientesModalComponent } from './modal/paciente.modal.component';
import { ModalController, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';


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
  filteredPacientes: Paciente[] = [];
  searchTerm = '';
  page: number = 1;
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private pacienteService: PacienteService, 
    private modalController: ModalController,
    private router: Router) { }

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

    if (data) {
      await this.obterTodosPacientes();
    }
  }

  deletePaciente(index: number) {
    const paciente = this.pacientes[index];
  
    this.pacienteService.deletePaciente(paciente.id).subscribe(() => {
      this.pacientes.splice(index, 1);
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
    if(!this.filteredPacientes){
      this.filteredPacientes = this.pacientes;
    }
  }

  navegarParaProcedimentos(pacienteId: number) {
    this.router.navigate(['/procedimentos', pacienteId]);
  }

}
