import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Paciente } from '../paciente.service';
import { PacienteService } from '../paciente.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
  phoneMask: string = '(00)00000-0000';
  cnsMask: string = '000 0000 0000 0000';
  classVariable: string = '';
  classCns: string = '';


  @ViewChild(IonModal) modal!: IonModal;

  changeClass (isCns: boolean) {
    if(isCns){
      this.classCns = 'item-has-focus';
    }else{
      this.classVariable = 'item-has-focus';
    }
 }

  constructor(private pacienteService: PacienteService,
    private ionModalController: ModalController,
    ) {
      this.form = new FormGroup({
        nome: new FormControl('', Validators.required),
        dataNascimento: new FormControl(''),
        observacao: new FormControl(''),
        celular: new FormControl(''),
        cns: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(19)]),
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

  salvar() {
    if (this.form.valid) {
      const formData = this.form.value;
  
      if (this.paciente) {
        // Atualizar paciente existente
        this.paciente.nome = formData.nome;
        this.paciente.dataNascimento = formData.dataNascimento;
        this.paciente.celular = formData.celular;
        this.paciente.cns = formData.cns;
        this.paciente.observacao = formData.observacao;
        this.atualizarPaciente(this.paciente);
      } else {
        // Criar novo paciente
        this.cadastrarPaciente(formData);
      }
  
      this.ionModalController.dismiss({ data: this.paciente });
    } else {
      console.log('não valido', this.form);
      // Lidar com a situação em que o formulário é inválido
    }
    this.ionModalController.dismiss({ data: this.paciente });
  }

  cadastrarPaciente(pacienteNew: Paciente) {
    this.pacienteService.addPaciente(pacienteNew).subscribe(
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

  atualizarPaciente(paciente: Paciente) {
    this.pacienteService.updatePaciente(paciente).subscribe(
      res => {
        console.log("sucesso");
        console.log(res);
        // this.displayMessage('Patient updated successfully.');
      },
      err => {
        console.log("error");
        console.log(err);
        // this.componentService.displayMessage('Failed to update patient. Please try again.');
      }
    );
  }

  private setFormValues(paciente: any) {
    this.form.patchValue({
      nome: paciente.nome,
      dataNascimento: this.convertDateFormat(paciente.dataNascimento),
      celular: paciente.celular,
      cns: paciente.cns,
    });
  }

  private convertDateFormat(dateStr: String): String {
      if(!dateStr){
        return '';
      }
    const dateParts = dateStr.split('/');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  }

}
