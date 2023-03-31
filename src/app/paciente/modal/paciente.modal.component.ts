import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { Paciente } from '../paciente.service';
import { PacienteService } from '../paciente.service'; 



@Component({
  selector: 'app-pacientes-modal',
  templateUrl: 'paciente.modal.component.html'
})
export class PacientesModalComponent implements OnInit {
  @Input() paciente: Paciente | null = null;

    displayedColumns: string[] = ['id', 'name', 'age', 'phone', 'cns'];
    pacientes:any = [];
    dataSource: any;
    pacienteNew: Paciente = new Paciente();

    dateMask: string = '00/00/0000';
    phoneMask: string = '(00)00000-0000';
    cnsMask: string = '000 0000 0000 0000';

    dataNascimento!: string;
    nome!: string;
    celular!: string;
    cns!: string;
    @ViewChild(IonModal) modal!: IonModal;
    isModalOpen = true;

    setOpen(isOpen: boolean) {
      this.isModalOpen = isOpen;
    }


  constructor(private pacienteService: PacienteService, 
    private modalController: ModalController) { }
  
  ngOnInit() {
    if (this.paciente) {
      this.nome = this.paciente.nome;
      this.dataNascimento = this.paciente.dataNascimento;
      this.celular = this.paciente.celular;
      this.cns = this.paciente.cns;
    }
  }

  cancelar() {
    this.isModalOpen = false;
    this.modal.dismiss();
  }

  salvar() {
    this.obterObjeto();
    console.log(this.paciente);
  
    if (this.paciente) {
      // Atualizar paciente existente
      this.atualizarPaciente(this.paciente);
    } else {
      // Criar novo paciente
      this.cadastrarPaciente(this.paciente);
    }
  
    this.modal.dismiss(this.nome, 'confirm');
  }

  obterObjeto() {
    this.pacienteNew.nome = this.nome;
    this.pacienteNew.dataNascimento = this.dataNascimento;
    this.pacienteNew.celular = this.celular;
    this.pacienteNew.cns = this.cns;
}
  
  cadastrarPaciente(paciente: any){
    this.pacienteService.addPaciente(paciente).subscribe(
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
