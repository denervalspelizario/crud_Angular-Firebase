import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {

  // variavel do input userName
  userEmail:string;

  // variavel do input userPassword
  userPassword:string;

  // variavel do input userConfirmPassword
  userConfirmPassword:string;

  constructor(
    public afAuth: AngularFireAuth,
    private rota: Router){}

  cadastrar()
  {
    if(this.userPassword !== this.userConfirmPassword)
    {
      window.alert('As senhas inseridas não são iguais. Por favor, verifique e tente novamente')
    } else {

      // chama o metodo do firebase que cria autenticação com email e senha
      this.afAuth.createUserWithEmailAndPassword(this.userEmail, this.userPassword)
      .then(() => {
        // deu certo hgera msg de sucesso e direciona a tela de login
        window.alert('Usuário cadastrado com sucesso!');
        this.rota.navigate(['/login']); // Redireciona para o login após o cadastro
      })
      .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        // Lide com o erro de forma apropriada
      });
    }

  }

}
