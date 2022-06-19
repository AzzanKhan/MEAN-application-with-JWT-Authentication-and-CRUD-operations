import { Component, OnInit } from '@angular/core';
import { Emitter } from '../emitters/auth.emitter';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isLoggedIn = false ;

  constructor(private tokenService : TokenService) { }

  ngOnInit(): void {
    Emitter.authEmitter.subscribe(res=>{
      this.isLoggedIn = res
    })
  }

  logout(){
    this.tokenService.deleteAccessToken()
    this.tokenService.deleteRefreshToken()
    Emitter.authEmitter.emit(false)
  }

}
