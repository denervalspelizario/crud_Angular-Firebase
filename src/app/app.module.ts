import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ModalViewUserComponent } from './pages/crud/modal-view-user/modal-view-user.component';
import { environment } from '../environments/environment.development';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { RedefinicaoSenhaComponent } from './pages/redefinicao-senha/redefinicao-senha.component';


// angular material
import {MatIconModule} from '@angular/material/icon' // icones do material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



// firebase + agular material
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // auth angular
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // Importar  
import { CrudComponent } from './pages/crud/crud.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import { ModalFormUserComponent } from './pages/crud/modal-form-user/modal-form-user.component'
import {MatSelectModule} from '@angular/material/select';
import { AlertaErroComponent } from './components/alerta-erro/alerta-erro.component';






@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CrudComponent,
    ModalViewUserComponent,
    ModalFormUserComponent,
    CadastroComponent,
    RedefinicaoSenhaComponent,
    //AlertaErroComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Angular Material
    MatIconModule,
    MatProgressSpinnerModule, // tipo um loading do angular material
    AngularFireModule.initializeApp(environment.firebaseConfig), // firebase
    AngularFireAuthModule,
    MatFormFieldModule,
    MatInputModule,
    MatSort,
    MatSortModule,
    MatPaginator,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    AngularFireStorageModule,


  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
