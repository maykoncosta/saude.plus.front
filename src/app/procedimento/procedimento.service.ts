import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Procedimento {
  id!: number;
  pacienteId!: number;
  nome!: string;
  observacao!: string;
  local!: string;
  tipo!: string;
  especialidade!: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProcedimentoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProcedimentos(idPaciente: number): Observable<Procedimento[]> {
    if(idPaciente === undefined){
      return this.http.get<any[]>(`${this.apiUrl}/procedimentos`)
      .pipe(
        map(procedimentosJson => procedimentosJson.map(p => {
          return {
            id: p.id,
            pacienteId: p.pacienteId,
            nome: p.pacienteNome,
            observacao:  p.observacao,
            local: p.local,
            tipo: p.tipo,
            especialidade: p.especialidade
          };
        }))
      );
    }else{
      return this.http.get<any[]>(`${this.apiUrl}/procedimentos/paciente/${idPaciente}`)
      .pipe(
        map(procedimentosJson => procedimentosJson.map(p => {
          return {
            id: p.id,
            pacienteId: p.pacienteId,
            nome: p.pacienteNome,
            observacao:  p.observacao,
            local: p.local,
            tipo: p.tipo,
            especialidade: p.especialidade
          };
        }))
      );
    }
  }

  getProcedimento(id: number) {
    return this.http.get(`${this.apiUrl}/procedimentos/${id}`);
  }

  addProcedimento(procedimento: any) {
    return this.http.post(`${this.apiUrl}/procedimentos`, procedimento);
  }

  updateProcedimento(procedimento: any) {
    return this.http.put(`${this.apiUrl}/procedimentos/${procedimento.id}`, procedimento);
  }

  deleteProcedimento(id: number) {
    return this.http.delete(`${this.apiUrl}/procedimentos/${id}`);
  }
}
