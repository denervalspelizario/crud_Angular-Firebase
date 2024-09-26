import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './components/menu/menu.component';

// angular material
import {MatIconModule} from '@angular/material/icon' // icones do material
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

// firebase
import {AngularFireModule} from '@angular/fire/compat'
import { environment } from '../environments/environment.development';
import { CrudComponent } from './pages/crud/crud.component';


@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    CrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule, // tipo um loading do angular material
    AngularFireModule.initializeApp(environment.firebaseConfig), // firebase

  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
