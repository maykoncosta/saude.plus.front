import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Procedimento, ProcedimentoService } from '../procedimento.service';
import { Paciente } from 'src/app/paciente/paciente.service';
import { PacienteService } from 'src/app/paciente/paciente.service';
import { PacientesModalComponent } from 'src/app/paciente/modal/paciente.modal.component';
import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedimentoModalComponent } from '../procedimento-modal/procedimento-modal.component';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-listagem-procedimento',
  templateUrl: './listagem-procedimento.component.html',
  styleUrls: ['./listagem-procedimento.component.scss'],
})
export class ListagemProcedimentoComponent implements OnInit {
  procedimentos: Procedimento[] = [];
  pacienteEdit!: any;
  paciente: Paciente = new Paciente();
  pacienteId: any;
  naoPossuiProcedimentos: boolean = false;
  page: number = 1;
  size: number = 10;
  totalPages: number = 1; // Novo atributo

  constructor(
    private procedimentoService: ProcedimentoService,
    private pacienteService: PacienteService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NotificationService
  ) {
    this.route.params.subscribe((params) => {
      this.pacienteId = params['pacienteId'];
    });
  }

  async ngOnInit() {
    await this.obterTodosProcedimentos();
  }

  async obterTodosProcedimentos(todos?: any) {
    try {
      if (todos) {
        this.pacienteId = undefined;
      }
      if (!this.pacienteId) {
        this.procedimentoService
          .getProcedimentos(this.pacienteId, this.page - 1, this.size)
          .subscribe((page) => {
            this.procedimentos = page.content;
            this.totalPages = page.totalPages;
            this.naoPossuiProcedimentos = !this.procedimentos;
          });
      } else {
        this.procedimentoService
          .getProcedimentoPorPaciente(this.pacienteId)
          .subscribe((procedimentos: Procedimento[]) => {
            this.procedimentos = procedimentos;
            this.naoPossuiProcedimentos = this.procedimentos.length === 0;
          });
      }
    } catch (error) {
      console.error('Erro ao obter procedimentos:', error);
    }
  }

  async obterPacientePorId(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pacienteService.getPaciente(id).subscribe(
        (paciente) => {
          resolve(paciente);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async openPacienteModal(pacienteId: number) {
    try {
      this.pacienteEdit = await this.obterPacientePorId(pacienteId);
      if (this.pacienteEdit) {
        const modal = await this.modalController.create({
          component: PacientesModalComponent,
          componentProps: {
            paciente: this.pacienteEdit,
          },
          cssClass: 'custom-modal',
        });
        await modal.present();

        const { data } = await modal.onDidDismiss();

        if (data) {
          await this.obterTodosProcedimentos();
        }
      } else {
        this.notification.showError('Paciente Não Encontrado.');
      }
    } catch (error) {
      console.error('Erro ao obter o paciente:', error);
    }
  }

  async abrirModalProcedimento(procedimento?: Procedimento) {
    if (procedimento) {
      this.pacienteId = procedimento.pacienteId;
    }
    const modal = await this.modalController.create({
      component: ProcedimentoModalComponent,
      componentProps: {
        procedimento: procedimento,
        paciente: await this.obterPacientePorId(this.pacienteId),
      },
      cssClass: 'custom-modal',
    });
    await modal.present();

    const { data } = await modal.onDidDismiss();

    if (data) {
      await this.obterTodosProcedimentos();
    }
  }

  async abrirModalProcedimentoNovo(idPaciente: number) {
    try {
      const modal = await this.modalController.create({
        component: ProcedimentoModalComponent,
        componentProps: {
          paciente: await this.obterPacientePorId(idPaciente),
        },
        cssClass: 'custom-modal',
      });
      await modal.present();

      const { data } = await modal.onDidDismiss();

      if (data) {
        await this.obterTodosProcedimentos();
        this.notification.showSuccess(
          'Lista de procedimentos atualizada com sucesso!'
        );
      }
    } catch {
      this.notification.showError(
        'Erro ao atualizar a lista de procedimentos.'
      );
    }
  }

  voltarParaPacientes() {
    this.router.navigate(['/pacientes']);
  }

  deletarProcedimento(index: number) {
    const procedimento = this.procedimentos[index];

    this.procedimentoService
      .deleteProcedimento(procedimento.id)
      .subscribe(() => {
        this.procedimentos.splice(index, 1);
      });
    this.obterTodosProcedimentos();
  }

  async nextPage() {
    this.page++;
    await this.obterTodosProcedimentos();
  }

  async previousPage() {
    if (this.page > 1) {
      this.page--;
      await this.obterTodosProcedimentos();
    }
  }
}
