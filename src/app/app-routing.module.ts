import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { CrudComponent } from './pages/crud/crud.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RedefinicaoSenhaComponent } from './pages/redefinicao-senha/redefinicao-senha.component';


// Defina uma rota para redirecionar usuários não autorizados para a página de login
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

// caminho das rotas
const routes: Routes = [

  {path: '', component: LoginComponent },
  {path: 'login', component: LoginComponent },
  {path: 'cadastro', component: CadastroComponent},
  {path: 'redefinicao-senha', component: RedefinicaoSenhaComponent},

  {path: 'home', component: HomeComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } },

  {path: 'crud', component: CrudComponent, canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin } },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
