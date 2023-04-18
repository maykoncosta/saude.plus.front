import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class Paciente {
    id!: number;
    nome!: string;
    dataNascimento!: String;
    celular!: string;
    cns!: Number;
    fotoPaciente!: string;
  }

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pacientes`)
      .pipe(
        map(pacientesJSON => pacientesJSON.map(p => {
          return {
            id: p.id,
            nome: p.nome,
            dataNascimento: p.dataNascimento,
            celular: p.celular,
            cns: p.cns,
            fotoPaciente: p.fotoPaciente
          };
        }))
      );
  }

  getPaciente(id: number) {
    return this.http.get(`${this.apiUrl}/pacientes/${id}`);
  }

  addPaciente(paciente: any) {
    return this.http.post(`${this.apiUrl}/pacientes`, paciente);
  }

  updatePaciente(paciente: any) {
    return this.http.put(`${this.apiUrl}/pacientes/`, paciente);
  }

  deletePaciente(id: number) {
    return this.http.delete(`${this.apiUrl}/pacientes/${id}`);
  }
}
