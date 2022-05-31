import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PairForm } from "../../interface/pairForm";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
}

@Injectable({providedIn: 'root'})
export class PairFormApiService {
  private apiURL = 'http://localhost:3000/forms';
  constructor(private http: HttpClient) { }

  getPairFormsFromServer(): Observable<PairForm[]> {
    return this.http.get<PairForm[]>(this.apiURL);
  }

  updatePairForm(pairForm: PairForm): Observable<PairForm> {
    return this.http.put<PairForm>(`${this.apiURL}/${pairForm.id}`, pairForm, httpOptions);
  }

  addPairForm(pairForm: PairForm): Observable<PairForm> {
    console.log(`Add pair form: to the server`);
    return this.http.post<PairForm>(this.apiURL, pairForm, httpOptions);
  }

  deletePairForm(pairForm: PairForm): Observable<PairForm> {
    return this.http.delete<PairForm>(`${this.apiURL}/${pairForm.id}`, httpOptions);
  }
}