import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup
  success = false;
  errMessage = ''

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private registerService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]
    }) 
  }

  register(){
    const formValue = this.registerForm.value
    this.registerService.register(formValue.username,formValue.password).subscribe({next:() => {
      this.success = true
    },error : (err) =>{
        this.errMessage= err.error
    }})
  }

}
