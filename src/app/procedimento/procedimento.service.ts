import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Procedimento {
  id!: number;
  nome!: string;
  dataRealizacao!: string;
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

  getProcedimentos(): Observable<Procedimento[]> {
    return this.http.get<any[]>(`${this.apiUrl}/procedimentos`)
      .pipe(
        map(procedimentosJson => procedimentosJson.map(p => {
          return {
            id: p.id,
            nome: p.pacienteNome,
            dataRealizacao:  p.dataRealizacao[2]+ '/' + p.dataRealizacao[1] + '/' + p.dataRealizacao[0],
            local: p.local,
            tipo: p.tipo,
            especialidade: p.especialidade
          };
        }))
      );
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
