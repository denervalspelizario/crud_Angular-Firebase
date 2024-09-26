import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  userName:string | null

  // ao iniciar a pagina
  ngOnInit(){

    // pegand o o dado use que esta na sessionStorage gravado
    this.userName = sessionStorage.getItem('user')


  }
}
