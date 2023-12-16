import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcedimentoService } from '../procedimento.service';
import { Procedimento } from '../procedimento.service';
import { IonModal, ModalController } from '@ionic/angular';
import { Paciente } from 'src/app/paciente/paciente.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-procedimento-modal',
  templateUrl: './procedimento-modal.component.html',
  styleUrls: ['./procedimento-modal.component.scss'],
})
export class ProcedimentoModalComponent  implements OnInit {
  form: FormGroup;
  @Input() procedimento: Procedimento | null = null;
  @Input() paciente: Paciente | null = null;

  tiposProcedimento: any = ['EXAME', 'CONSULTA','CIRUGIA'];
  novoProcedimento: Procedimento = new Procedimento();

  dateMask: string = '00/00/0000';
  pacienteId!: number;
  isEditar: boolean = true;

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private service: ProcedimentoService,
    private router: Router,
    private ionModalController: ModalController,
    private notification: NotificationService) {
      this.form = new FormGroup({
        nome: new FormControl('', Validators.required),
        observacao: new FormControl(''),
        tipo: new FormControl('', Validators.required,),
        dataEntrega: new FormControl(''),
        especialidade: new FormControl(''),
        pacienteId: new FormControl(''),
      });
    }

  ngOnInit() {
    if(!this.procedimento){
      this.isEditar = false;
      this.procedimento = new Procedimento;
      this.procedimento.dataEntrega = this.formatDate(new Date());
    }
    this.setFormValues(this.procedimento);
  }

  cancelar() {
    this.ionModalController.dismiss();
  }

  async salvar() {
    if (this.form.valid) {
      const formData = this.form.value;
      if (this.procedimento?.id) {
        this.procedimento.observacao= formData.observacao;
        this.procedimento.especialidade = formData.especialidade;
        this.procedimento.dataEntrega = formData.dataEntrega;
        this.procedimento.tipo = formData.tipo;
        this.atualizarProcedimento(this.procedimento);
      } else {
        this.cadastrarProcedimento(formData);
      }
  
      this.ionModalController.dismiss({ data: this.procedimento });
    } else {
      this.notification.showError("Error ao Salvar Procedimento.");
    }
    await this.ionModalController.dismiss({ data: this.procedimento });
  }

  cadastrarProcedimento(novoProcedimento: Procedimento) {
    this.service.addProcedimento(novoProcedimento).subscribe(
      res => {
        this.notification.showSuccess("Procedimento Cadastrado com Sucesso");
      },
      err => {
        this.notification.showError("Erro ao Cadastrar Procedimento.");
      }
    );
  }

  atualizarProcedimento(procedimento: Procedimento) {
    this.service.updateProcedimento(procedimento).subscribe(
      res => {
        this.notification.showSuccess("Procedimento Atualizado com Sucesso!");
      },
      err => {
        this.notification.showError("Erro ao Atualizar Procedimento!");
      }
    );
  }

  private setFormValues(procedimento: any) {
    this.form.patchValue({
      nome: this.paciente?.nome,
      observacao: procedimento?.observacao,
      dataEntrega: procedimento?.dataEntrega,
      especialidade: procedimento?.especialidade,
      tipo: procedimento?.tipo,
      pacienteId: this.paciente?.id,
    });
  }

  handleChange(ev:any) {
    this.procedimento!.tipo = ev.target.value;
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 porque os meses começam em 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
