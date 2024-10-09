import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { MatDialog } from '@angular/material/dialog';
import { AlertaErroComponent } from '../../components/alerta-erro/alerta-erro.component';


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
    private rota: Router, // rota
    public afAuth: AngularFireAuth, // autenticação firebase tanto normal com com google
    public dialog: MatDialog // alerta do material
  ){}


  abrirAlerta() {
    this.dialog.open(AlertaErroComponent, {
      data: {
        mensagem: "E-mail ou senha incorretos. Por favor, verifique e tente novamente."
      }
    });
  }

  // função login com firebase
  login(){
    this.userLoginFail = false;

    this.afAuth.signInWithEmailAndPassword(this.userEmail, this.userPassword)
      .then(() => this.rota.navigate(['/home']))
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          this.userLoginFail = true;
          // gera o alerta de erro
          //window.alert(' E-mail ou senha incorretos. Por favor, verifique e tente novamente.')
          this.abrirAlerta()
          console.error('Erro ao fazer login:', error);

          // zera os dados de input
          this.userEmail = ''
          this.userPassword = ''

      } else {

        // gerando alerta de erro
        //window.alert('Houve um erro ao logar usuário, tente novamente')
        this.abrirAlerta()
        console.error('Erro ao fazer login:', error);

        // zera os dados de input
        this.userEmail = ''
        this.userPassword = ''
      }

    });

    // salvando dados da userName de maneira temporária no navegador
    //sessionStorage.setItem('user', this.userEmail)

    //depois de pegar o dado userName vai para pagina home
    this.rota.navigate(['home'])
  }

  // função login com firebase google
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
