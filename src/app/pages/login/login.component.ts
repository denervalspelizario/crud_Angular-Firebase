import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // variavel do input userName
  userName:string;

  // variavel do input userPassword
  userPassword:string;

  // injeções de dependencia
  constructor(private rota: Router){

  }

  // função que pega dados do formulario de login
  login(){

    // salvando dados da userName de maneira temporária no navegador
    // esse dado será salvo na variavel temporaria user
    sessionStorage.setItem('user', this.userName)

    //depois de pegar o dado userName vai para pagina home
    this.rota.navigate(['home'])
  }
}
