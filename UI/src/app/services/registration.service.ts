import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

  register(username:string,password:string):Observable<any>{
    return this.http.post('http://localhost:8000/users/register',{username,password})
  }
}
