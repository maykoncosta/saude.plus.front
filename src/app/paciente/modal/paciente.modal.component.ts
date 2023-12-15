import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Paciente } from '../paciente.service';
import { PacienteService } from '../paciente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/notification.service';


@Component({
  selector: 'app-pacientes-modal',
  templateUrl: 'paciente.modal.component.html',
  styleUrls: ['paciente.modal.component.scss'],
})
export class PacientesModalComponent implements OnInit {
  form: FormGroup;
  @Input() paciente: Paciente | null = null;

  displayedColumns: string[] = ['id', 'name', 'obs', 'phone', 'cns'];
  pacientes: any = [];
  pacienteNew: Paciente = new Paciente();

  dateMask: string = '00/00/0000';
  cnsMask: string = '000 0000 0000 0000';
  classVariable: string = '';
  classCns: string = '';


  @ViewChild(IonModal) modal!: IonModal;

  changeClass(isCns: boolean) {
    if (isCns) {
      this.classCns = 'item-has-focus';
    } else {
      this.classVariable = 'item-has-focus';
    }
  }

  constructor(private pacienteService: PacienteService,
    private ionModalController: ModalController,
    private notification: NotificationService,
  ) {
    this.form = new FormGroup({
      nome: new FormControl('', Validators.required),
      observacao: new FormControl(''),
      celular: new FormControl(''),
      cns: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(19)]),
    });
  }

  ngOnInit() {
    if (this.paciente) {
      this.setFormValues(this.paciente);
      this.classCns = 'item-has-focus';
      this.classVariable = 'item-has-focus';
    }
  }

  cancelar() {
    this.ionModalController.dismiss();
  }

  async salvar() {
    try {
      if (this.form.valid) {
        const formData = this.form.value;

        if (this.paciente) {
          // Atualizar paciente existente
          this.paciente.nome = formData.nome;
          this.paciente.celular = formData.celular;
          this.paciente.cns = formData.cns;
          this.paciente.observacao = formData.observacao;
          await this.atualizarPaciente(this.paciente);
          this.notification.showSuccess("Paciente Atualizado com Sucesso!");
        } else {
          // Criar novo paciente
          await this.cadastrarPaciente(formData);
          this.notification.showSuccess("Paciente Cadastrado com Sucesso!");
        }

        this.ionModalController.dismiss({ data: this.paciente });
      } else {
        this.notification.showError("Erro na operação: Formulário inválido");
      }
    } catch (err) {
      console.error(err);
      this.notification.showError("Erro ao processar a operação.");
    }
  }

  async atualizarPaciente(paciente: Paciente): Promise<any> {
    return this.pacienteService.updatePaciente(paciente).toPromise();
  }

  async cadastrarPaciente(pacienteNew: Paciente): Promise<any> {
    return this.pacienteService.addPaciente(pacienteNew).toPromise();
  }


  private setFormValues(paciente: any) {
    this.form.patchValue({
      nome: paciente.nome,
      observacao: paciente.observacao,
      celular: paciente.celular,
      cns: paciente.cns,
    });
  }
}