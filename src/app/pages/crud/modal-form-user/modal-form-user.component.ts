import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../interfaces/user';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  // variavel com os beneficios que será usada como um select no formularios
  planosSaude = [
    {
      id: 1,
      descricao: 'Plano 300 Enfermaria'
    },
    {
      id: 2,
      descricao: 'Plano 400 Enfermaria'
    },
    {
      id: 3,
      descricao: 'Plano 500 Plus'
    }
  ];

  // variavel com os beneficios que será usada como um select no formularios
  planosOdonto = [
    {
      id: 1,
      descricao: 'Plano 300 Basic Odonto'
    },
    {
      id: 2,
      descricao: 'Plano 400 Medium Odonto'
    },
    {
      id: 3,
      descricao: 'Plano 500 Plus Odonto'
    }
  ];


  // variavel do formulario
  formUser: FormGroup;

  // variavel que será usada para mudar titulo do modal
  nameUser: string



  // injeções de dependencia
  constructor(
    public dialogRef: MatDialogRef<ModalFormUserComponent>, // referencia modal e component usado
    private formBuilder: FormBuilder, // formulário
    private userService: UsersService, // metodos para consumir o banco
    @Inject(MAT_DIALOG_DATA) public data: any // receb os dados do user pelo data
    )
  {

  }


  // função que inicia ao chamar o modal
  ngOnInit()
  {
    this.buildForm() // chamando o formulário

    // tem dados no data? tem nome?
    if(this.data && this.data.name)
    {
      // se tem então vamos pegar o nome
      this.nameUser = this.data.name
    }
  }

  // salvar usuário e editar usuarios
  // como o modal será usado no post e no update esse metodo
  // será usado em ambos
  saveUser()
  {
    // pegando os dados do formulário
    const objUserForm: User = this.formUser.getRawValue();
    //console.log('Dados do formulário', objUserForm)


    // se os dados ja existem e existe um nome, então é um edit
    if(this.data && this.data.name)
    {
      // chamando o método update de alterar usuario do service
      // será passado nesse método o id e os dados do formulario(objUserForm)
      this.userService.updateUser(this.data.firebaseId, objUserForm).then(
        (response: any) => {
          window.alert('Usuário Editado com sucesso');

        // depois de salvar vamos fechar o modal usando a função que fecha o modal
        this.closeModal();
      })
      .catch(err => {
        window.alert('Houve algum erro ao editar o usuário')
        console.log(err) // vendo o erro se tiver
      });
    }
     else //se não( é um dado novo ) então vamos salvar o user
    {

      // chamando o método post de adicionar usuario do service colocar os dados do formulário
      this.userService.addUser(objUserForm).then(
        (response: any) => {
          window.alert('Usuário Salvo com sucesso');

        // depois de salvar vamos fechar o modal usando a função que fehca o modal
        this.closeModal();
      })
      .catch(err => {
        window.alert('Houve algum erro ao salvar o usuário')
        console.log(err) // vendo o erro se tiver
      });
    }


  }

  // funcao que gera o formulário
  buildForm()
  {

    this.formUser = this.formBuilder.group({

      //    inicio do formulario,, validação do formulário
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      helthPlan: [''],
      dentalPlan: [''],
    });

    // aqui ja é sobre o edit
    // se os dados ja existem e existe um nome, então é um edit
    if(this.data && this.data.name)
    {
      // se tem esses dados(ou seja um edit) chamo a função fillForm
      this.fillForm()
    }
  }

  // esa função preenche o formulario com os dados que estão no banco
  fillForm()
  {
    // chamando o formulário e preenchendo com os dados do banco(data)
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan,
    })
  }


  // funcao que fecha modal
  closeModal()
  {
    this.dialogRef.close()
  }




}
