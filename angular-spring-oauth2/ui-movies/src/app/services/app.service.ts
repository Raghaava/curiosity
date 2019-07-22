import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private router: Router) { }

  login(loginData) {
    console.log(loginData.userName + ' login ' + loginData.password);
    let tokenUrl: string = 'http://localhost:8081/spring-security-oauth-server/oauth/token';
    let params = new URLSearchParams();
    params.append('username', loginData.userName);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'first_app');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa("first_app:secret")
      })
    }

    this.http.post(tokenUrl, params.toString(), httpOptions).subscribe(
        data => this.saveToken(data)
    )
  }

  saveToken(token){
      let expireDate = new Date().getTime()*(1000 * token.expires_in);
      Cookie.set("access_token", token.access_token, expireDate);
      this.router.navigate(['/']);
  }
}
