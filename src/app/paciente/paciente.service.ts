import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from '../procedimento/procedimento.service';

export class Paciente {
  id!: number;
  nome!: string;
  dataNascimento!: string;
  celular!: string;
  cns!: number;
  observacao!: string;
}

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPacientes(
    searchTerm: string = '',
    page: number = 0,
    size: number = 10
  ): Observable<Page<Paciente>> {
    return this.http
      .get<Page<Paciente>>(`${this.apiUrl}/pacientes`, {
        params: {
          nome: searchTerm.toString(),
          page: page.toString(),
          size: size.toString(),
        },
      })
      .pipe(
        map((pageData) => {
          pageData.content = pageData.content.map((p: Paciente) => {
            return {
              id: p.id,
              nome: p.nome,
              dataNascimento: p.dataNascimento,
              celular: p.celular,
              cns: p.cns,
              observacao: p.observacao,
            };
          });
          return pageData;
        })
      );
  }

  getPaciente(id: number) {
    return this.http.get(`${this.apiUrl}/pacientes/${id}`);
  }

  addPaciente(paciente: any) {
    return this.http.post(`${this.apiUrl}/pacientes`, paciente);
  }

  updatePaciente(paciente: any) {
    return this.http.put(`${this.apiUrl}/pacientes`, paciente);
  }

  deletePaciente(id: number) {
    return this.http.delete(`${this.apiUrl}/pacientes/${id}`);
  }
}
