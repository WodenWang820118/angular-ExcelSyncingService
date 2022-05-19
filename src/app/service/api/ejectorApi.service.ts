import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EjectorForm } from "../../interface/ejector";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({providedIn: 'root'})
export class EjectorApiService {
  private apiURL = 'http://localhost:3000/forms';
  constructor(private http: HttpClient) { }

    // ejector form
    getEjectorFormsFromServer(): Observable<EjectorForm[]> {
      return this.http.get<EjectorForm[]>(this.apiURL);
    }
  
    updateEjectorForm(ejectorForm: EjectorForm): Observable<EjectorForm> {
      return this.http.put<EjectorForm>(`${this.apiURL}/${ejectorForm.id}`, ejectorForm, httpOptions);
    }
  
    addEjectorForm(ejectorForm: EjectorForm): Observable<EjectorForm> {
      return this.http.post<EjectorForm>(this.apiURL, ejectorForm, httpOptions);
    }
  
    deleteEjectorForm(ejectorForm: EjectorForm): Observable<EjectorForm> {
      return this.http.delete<EjectorForm>(`${this.apiURL}/${ejectorForm.id}`, httpOptions);
    }
}