import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginData = {userName:"", password:""};
  constructor( private loginService:AppService ) { }

  ngOnInit() {
  }

  login(){
      this.loginService.login(this.loginData);
  }
}
