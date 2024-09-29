import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  // variavel do input userName
  userEmail:string;

  // variavel do input userPassword
  userPassword:string;

  //
  userLoginFail: boolean;

  // injeções de dependencia
  constructor(
    private rota: Router,
    public afAuth: AngularFireAuth){

  }

  // função que pega dados do formulario de login
  login(){

    this.afAuth.signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then(() => this.rota.navigate(['/home']))
      .catch(error => {
        console.error('Erro ao fazer login:', error);
        this.userLoginFail = true;
    });

    // salvando dados da userName de maneira temporária no navegador
    // esse dado será salvo na variavel temporaria user
    sessionStorage.setItem('user', this.userEmail)

    //depois de pegar o dado userName vai para pagina home
    this.rota.navigate(['home'])
  }

  loginGoogle()
  {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => {
        this.rota.navigate(['/home']); // Redireciona para a home após o login
      })
      .catch(error => {
        console.error('Erro ao fazer login com o Google:', error);
        this.userLoginFail = true;
      });
  }
}
