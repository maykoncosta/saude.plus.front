import { Component, OnInit } from '@angular/core';
import { Procedimento, ProcedimentoService } from '../procedimento.service';
import { Paciente } from 'src/app/paciente/paciente.service';
import { PacienteService } from 'src/app/paciente/paciente.service';
import { PacientesModalComponent } from 'src/app/paciente/modal/paciente.modal.component';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcedimentoModalComponent } from '../procedimento-modal/procedimento-modal.component';

@Component({
  selector: 'app-listagem-procedimento',
  templateUrl: './listagem-procedimento.component.html',
  styleUrls: ['./listagem-procedimento.component.scss'],
})
export class ListagemProcedimentoComponent  implements OnInit {
  procedimentos: Procedimento[] = [];
  pacienteEdit!: any;
  paciente: Paciente = new Paciente();
  pacienteId: any;
  naoPossuiProcedimentos: boolean = false;

  constructor(private procedimentoService: ProcedimentoService,
    private pacienteService: PacienteService,
    private modalController: ModalController,
    private router: Router,
    private route: ActivatedRoute) {
      this.route.params.subscribe((params) => {
        this.pacienteId = params['pacienteId'];
      });
    }

  async ngOnInit() {
    await this.obterTodosPacientes();
  }

  async obterTodosPacientes(){
    this.procedimentoService.getProcedimentos(this.pacienteId).subscribe(procedimentos => {
      console.log('listagem');
      this.procedimentos = procedimentos;
      if(this.procedimentos.length == 0){
        this.naoPossuiProcedimentos = true;
      }
    });
    
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
          cssClass: "custom-modal",
        });
        await modal.present();
  
        const { data } = await modal.onDidDismiss();
  
        if (data) {
          await this.obterTodosPacientes();
        }
      } else {
        console.log("Paciente não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao obter o paciente:", error);
    }
  }

  async abrirModalProcedimento(procedimento?: Procedimento) {
    if(procedimento){
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
      await this.obterTodosPacientes();
    }
  }

  async abrirModalProcedimentoNovo(idPaciente?: number) {
    const modal = await this.modalController.create({
      component: ProcedimentoModalComponent,
      componentProps: {
        paciente: await this.obterPacientePorId(this.pacienteId),
      },
      cssClass: 'custom-modal',
    });
    await modal.present();
    
    const { data } = await modal.onDidDismiss();

    if (data) {
      await this.obterTodosPacientes();
    }
  }

  voltarParaPacientes() {
    this.router.navigate(['/pacientes']);
  }

  deletarProcedimento(index:number){
    const procedimento = this.procedimentos[index];

    this.procedimentoService.deleteProcedimento(procedimento.id).subscribe(() => {
      this.procedimentos.splice(index, 1);
    });
  }

}
