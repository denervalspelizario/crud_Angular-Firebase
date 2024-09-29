import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(
    public afAuth: AngularFireAuth,
    private rota: Router
  ) {}


  logout() {
    this.afAuth.signOut().then(() => {
      this.rota.navigate(['/login']);
    });
  }

}
