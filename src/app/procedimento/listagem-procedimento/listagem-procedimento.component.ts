import { Component, OnInit } from '@angular/core';
import { ProcedimentoService } from '../procedimento.service';

@Component({
  selector: 'app-listagem-procedimento',
  templateUrl: './listagem-procedimento.component.html',
  styleUrls: ['./listagem-procedimento.component.scss'],
})
export class ListagemProcedimentoComponent  implements OnInit {

  procedimentos:any;

  constructor(private procedimentoService: ProcedimentoService) { }

  ngOnInit() {
    this.obterTodosPacientes();
  }

  obterTodosPacientes(){
    this.procedimentoService.getProcedimentos().subscribe(procedimentos => {
      console.log(procedimentos);
      this.procedimentos = procedimentos;
    });
  }
}
