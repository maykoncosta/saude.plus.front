import { Component, OnInit, ViewChild } from '@angular/core';
import { Paciente, PacienteService } from './paciente.service';
import { PacientesModalComponent } from './modal/paciente.modal.component';
import { ModalController, IonModal } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { Page } from '../procedimento/procedimento.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: 'paciente.component.html',
  styleUrls: ['paciente.component.scss'],
})
export class PacientesComponent implements OnInit {
  paciente: Paciente = new Paciente();
  pacientes: Paciente[] = [];
  filteredPacientes: Paciente[] = [];
  page: number = 1;
  totalPages: number = 0;
  size: number = 10;
  totalElements: number = 0;
  searchTerm = '';
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private pacienteService: PacienteService,
    private modalController: ModalController,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.obterTodosPacientes();
  }

  async obterTodosPacientes() {
    try {
      const pageData = await this.pacienteService
        .getPacientes(this.searchTerm, this.page - 1, this.size)
        .toPromise();
      if (pageData) {
        this.pacientes = pageData.content;
        this.totalElements = pageData.totalElements;
        this.totalPages = pageData.totalPages;
        this.filteredPacientes = this.pacientes;
      }
    } catch (err) {
      console.log(err);
      this.notification.showError('Erro ao carregar pacientes.');
    }
  }

  async openPacienteModal(paciente?: Paciente) {
    try {
      const modal = await this.modalController.create({
        component: PacientesModalComponent,
        componentProps: {
          paciente: paciente,
        },
        cssClass: 'custom-modal',
      });

      await modal.present();

      const { data } = await modal.onDidDismiss();

      if (data) {
        await this.obterTodosPacientes();
        this.notification.showSuccess(
          'Lista de pacientes atualizada com sucesso!'
        );
      }
    } catch (err) {
      this.notification.showError('Erro ao atualizar a lista de pacientes.');
    }
  }

  deletePaciente(pacienteId: number) {
    this.pacienteService.deletePaciente(pacienteId).subscribe(
      (res) => {
        this.obterTodosPacientes();
        this.notification.showSuccess('Paciente Excluído com Sucesso!');
      },
      (err) => {
        this.notification.showError('Erro ao Excluir Paciente.');
      }
    );
  }

  filterPacientes() {
    this.page = 1;
    if (this.searchTerm.length > 3) {
      this.obterTodosPacientes();
    } else if (this.searchTerm.length === 0) {
      this.obterTodosPacientes();
    } else if (this.searchTerm.length < 4 && this.searchTerm.length > 0) {
      this.notification.showError('Insira pelo menos 4 caracteres');
    }
  }

  async nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      await this.obterTodosPacientes();
    }
  }

  async previousPage() {
    if (this.page > 1) {
      this.page--;
      await this.obterTodosPacientes();
    }
  }

  navegarParaProcedimentos(pacienteId: number) {
    this.router.navigate(['/procedimentos', pacienteId]);
  }
}
