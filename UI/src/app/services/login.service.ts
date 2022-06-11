import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(username:string,password:string):Observable<any>{
    return this.http.post('http://localhost:8000/users/login',{username,password})
  }
}
