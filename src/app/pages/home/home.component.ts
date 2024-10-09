import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  userMail:any
  userId: any
  userName: any
  userPhoto: any
  userCargo: any
  userDepartamento: any
  userSobrenome: any
  dadosUsuario : any

  // injeções de dependencia
  constructor(
    public afAuth: AngularFireAuth,
    public service: UsersService) {}


  // ao iniciar a pagina
  ngOnInit(){

    // pegand o email que esta na sessionStorage gravado
    //this.userMail = sessionStorage.getItem('user')

    // dados usuário logado por google
    this.afAuth.authState.subscribe(userLogado => {
      this.dadosUsuario = userLogado;
      if (this.dadosUsuario) {

        // pegando dados por id idenpendente do tipo de login
        this.userId = this.dadosUsuario.uid;

        // se displayName existe então login foi pelo google então
        if(this.dadosUsuario.displayName)
        {
          // pegando os dados vindo do google
          this.userMail = this.dadosUsuario.email
          this.userName = this.dadosUsuario.displayName
          this.userPhoto = this.dadosUsuario.photoURL

        } else { // senão o login veio por email/senha

          // então pego os dados via metodo get pelo id
          this.service.getUserId(this.userId).subscribe((usuario: any) => {

            this.userName = usuario.nome;
            this.userMail = usuario.email;
            this.userPhoto = usuario.fotoUrl;
            this.userSobrenome = usuario.sobrenome;
            this.userCargo = usuario.cargo;
            this.userDepartamento = usuario.departamento;

          });
        }

      }

    });

  }
}
