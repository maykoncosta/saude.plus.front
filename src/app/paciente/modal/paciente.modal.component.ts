import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Paciente } from '../paciente.service';
import { PacienteService } from '../paciente.service';


@Component({
  selector: 'app-pacientes-modal',
  templateUrl: 'paciente.modal.component.html',
  styleUrls: ['paciente.modal.component.scss'],
})
export class PacientesModalComponent implements OnInit {
  @Input() paciente: Paciente | null = null;

  displayedColumns: string[] = ['id', 'name', 'age', 'phone', 'cns'];
  pacientes: any = [];
  dataSource: any;
  pacienteNew: Paciente = new Paciente();

  dateMask: string = '00/00/0000';
  phoneMask: string = '(00)00000-0000';
  cnsMask: string = '000 0000 0000 0000';

  dataNascimento!: Date;
  nome!: string;
  celular!: string;
  cns!: Number;
  fotoPaciente!: string;

  @ViewChild(IonModal) modal!: IonModal;
  isModalOpen = true;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private pacienteService: PacienteService,
    private ionModalController: ModalController,
    ) { }

  ngOnInit() {
    if (this.paciente) {
      this.nome = this.paciente.nome;
      this.dataNascimento = this.paciente.dataNascimento;
      this.celular = this.paciente.celular;
      this.cns = this.paciente.cns;
      this.fotoPaciente = this.paciente.fotoPaciente;
    }
  }

  cancelar() {
    console.log('componente da modal');
    this.isModalOpen = false;
    this.ionModalController.dismiss();
  }

  salvar() {
    this.obterObjeto();
    console.log(this.paciente);

    if (this.paciente) {
      // Atualizar paciente existente
      this.paciente.nome = this.nome;
      this.paciente.dataNascimento = this.dataNascimento;
      this.paciente.celular = this.celular;
      this.paciente.cns = this.cns;
      this.paciente.fotoPaciente = this.fotoPaciente;
      this.atualizarPaciente(this.paciente);
    } else {
      // Criar novo paciente
      this.cadastrarPaciente(this.pacienteNew);
    }

    this.ionModalController.dismiss({ data: this.paciente });
  }

  obterObjeto() {
    this.pacienteNew.nome = this.nome;
    this.pacienteNew.dataNascimento = this.dataNascimento;
    this.pacienteNew.celular = this.celular;
    this.pacienteNew.cns = this.cns;
    this.pacienteNew.fotoPaciente = this.fotoPaciente;

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

}
