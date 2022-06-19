import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  storeAccessToken = (token:string) => {
    localStorage.setItem('accessToken',token)
  }

  storeRefrshToken = (token:string) => {
    localStorage.setItem('refreshToken',token)
  }

  getAccessToken = () => {
    return localStorage.getItem('accessToken')
  }

  getRefreshToken = () => {
    return localStorage.getItem('refreshToken')
  }

  deleteAccessToken = () => {
    localStorage.removeItem('accessToken')
  }

  deleteRefreshToken = () => {
    localStorage.removeItem('refreshToken')
  }


}
