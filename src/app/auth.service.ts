import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem("currentUser")!));
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/api/auth/login`, { username, password })
      .pipe(map(user => {
        // Armazenando os detalhes do usuário e o token JWT no local storage para manter o usuário logado entre as atualizações de página
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('currentUser'); 
    if (!token) {
      return false;
    }

    const decodedToken = jwt_decode.jwtDecode<any>(token);
    const now = new Date().getTime() / 1000; // Tempo atual em segundos
    return decodedToken.exp > now;
  }

}
