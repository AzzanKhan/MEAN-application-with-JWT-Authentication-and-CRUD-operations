import { Component, OnInit } from '@angular/core';
import { Emitter } from '../emitters/auth.emitter';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userName = null ;

  constructor(private homeService : HomeService) { }

  ngOnInit(): void {
    this.homeService.accessHome().subscribe({next: (res) => {
      this.userName = res.username
      Emitter.authEmitter.emit(true)
    },error : (err) =>{
      Emitter.authEmitter.emit(false)
    }})
  }

}
