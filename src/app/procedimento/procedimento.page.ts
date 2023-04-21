import { Component, OnInit } from '@angular/core';
import { ProcedimentoService } from './procedimento.service';

@Component({
  selector: 'app-procedimento',
  templateUrl: './procedimento.page.html',
  styleUrls: ['./procedimento.page.scss'],
})
export class ProcedimentoPage implements OnInit {
  procedimentos:any;

  constructor(private procedimentoService: ProcedimentoService) { }

  ngOnInit() {
  }

}
