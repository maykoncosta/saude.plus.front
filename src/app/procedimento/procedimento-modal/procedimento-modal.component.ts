import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProcedimentoService } from '../procedimento.service';
import { Procedimento } from '../procedimento.service';
import { IonModal, ModalController } from '@ionic/angular';
import { Paciente } from 'src/app/paciente/paciente.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
    private ionModalController: ModalController) {
      this.form = new FormGroup({
        nome: new FormControl('', Validators.required),
        dataRealizacao: new FormControl(''),
        tipo: new FormControl('', Validators.required,),
        local: new FormControl('', Validators.required),
        especialidade: new FormControl(''),
        pacienteId: new FormControl(''),
      });
    }

  ngOnInit() {
    if(!this.procedimento){
      this.isEditar = false;
      this.procedimento = new Procedimento;
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
        // Atualizar paciente existente
        console.log(formData);
        this.procedimento.dataRealizacao = formData.dataRealizacao;
        this.procedimento.especialidade = formData.especialidade;
        this.procedimento.local = formData.local;
        this.procedimento.tipo = formData.tipo;
        this.atualizarProcedimento(this.procedimento);
      } else {
        // Criar novo paciente
        this.cadastrarProcedimento(formData);
      }
  
      this.ionModalController.dismiss({ data: this.procedimento });
    } else {
      console.log('não valido', this.form);
      // Lidar com a situação em que o formulário é inválido
    }
    await this.ionModalController.dismiss({ data: this.procedimento });
  }

  cadastrarProcedimento(novoProcedimento: Procedimento) {
    this.service.addProcedimento(novoProcedimento).subscribe(
      res => {
        console.log("sucesso");
        console.log(res);
        // this.displayMessage('Patient added successfully.');
      },
      err => {
        console.log("error");
        console.log(err);
        // this.componentService.displayMessage('Failed to add patient. Please try again.');
      }
    );
  }

  atualizarProcedimento(procedimento: Procedimento) {
    this.service.updateProcedimento(procedimento).subscribe(
      res => {
        console.log("sucesso");
        // this.displayMessage('Patient updated successfully.');
      },
      err => {
        console.log("error");
        console.log(err);
        // this.componentService.displayMessage('Failed to update patient. Please try again.');
      }
    );
  }

  private setFormValues(procedimento: any) {
    this.form.patchValue({
      nome: this.paciente?.nome,
      dataRealizacao: this.convertDateFormat(procedimento?.dataRealizacao),
      local: procedimento?.local,
      especialidade: procedimento?.especialidade,
      tipo: procedimento?.tipo,
      pacienteId: this.paciente?.id,
    });
  }

  private convertDateFormat(dateStr: string): String {
      if(!dateStr){
        return '';
      }
      const dataHoraMoment = moment(dateStr, 'DD/MM/YYYY');
      return dataHoraMoment.format('YYYY-MM-DD');
  }

  handleChange(ev:any) {
    this.procedimento!.tipo = ev.target.value;
  }

}
