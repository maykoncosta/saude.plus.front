import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Procedimento {
  id!: number;
  pacienteId!: number;
  pacienteNome!: string;
  observacao!: string;
  dataEntrega!: string;
  tipo!: string;
  especialidade!: string;
}

export class Page<T> {
  content!: T[];
  totalPages!: number;
  totalElements!: number;
  last!: boolean;
  size!: number;
  number!: number;
  first!: boolean;
  numberOfElements!: number;
  empty!: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProcedimentoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProcedimentos(
    idPaciente: number,
    page: number = 0,
    size: number = 10,
    sort: string = 'id,asc'
  ): Observable<Page<Procedimento>> {
    let url = `${this.apiUrl}/procedimentos`;
    return this.http
      .get<Page<Procedimento>>(url, {
        params: {
          page: page.toString(),
          size: size.toString(),
        },
      })
      .pipe(
        map((pageData) => {
          if (!pageData.content) return pageData;
          pageData.content = pageData.content.map((p: Procedimento) => {
            return {
              id: p.id,
              pacienteId: p.pacienteId,
              pacienteNome: p.pacienteNome,
              observacao: p.observacao,
              dataEntrega: p.dataEntrega,
              tipo: p.tipo,
              especialidade: p.especialidade,
            };
          });
          return pageData;
        })
      );
  }

  getProcedimentoPorPaciente(idPaciente: number): any {
    let url = `${this.apiUrl}/procedimentos/paciente/${idPaciente}`;
    return this.http.get<any[]>(url).pipe(
      map((procedimentosJson) =>
        procedimentosJson.map((p) => {
          return {
            id: p.id,
            pacienteId: p.pacienteId,
            nome: p.pacienteNome,
            observacao: p.observacao,
            dataEntrega: p.dataEntrega,
            tipo: p.tipo,
            especialidade: p.especialidade,
          };
        })
      )
    );
  }

  getProcedimento(id: number) {
    return this.http.get(`${this.apiUrl}/procedimentos/${id}`);
  }

  addProcedimento(procedimento: any) {
    return this.http.post(`${this.apiUrl}/procedimentos`, procedimento);
  }

  updateProcedimento(procedimento: any) {
    return this.http.put(
      `${this.apiUrl}/procedimentos/${procedimento.id}`,
      procedimento
    );
  }

  deleteProcedimento(id: number) {
    return this.http.delete(`${this.apiUrl}/procedimentos/${id}`);
  }
}
