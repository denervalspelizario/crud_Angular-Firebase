import { Component, Inject } from '@angular/core';
import { User } from '../../../interfaces/user';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-view-user',
  templateUrl: './modal-view-user.component.html',
  styleUrl: './modal-view-user.component.scss'
})
export class ModalViewUserComponent {

  // variavel
  userData: User;

  // injeções de dependencia
  constructor(
    public dialogRef: MatDialogRef<ModalViewUserComponent>,

    // essa variavel vai receber os dados vindo do modal
    @Inject(MAT_DIALOG_DATA) public data:any
  ){

     // depois de receber os dados do modal(data) adicionei na variavel userData
    this.userData = data
    console.log('dados do usuário: ',  this.userData)

  }


  // metodo que fecha o modal
  closeModal(){
    this.dialogRef.close()
  }

}
