import { Component, ViewChild } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { User } from '../../interfaces/user';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewUserComponent } from './modal-view-user/modal-view-user.component';
import { ModalFormUserComponent } from './modal-form-user/modal-form-user.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {

  // variavel que será usada pelo angular material
  displayedColumns: string[] = [
    'id', 'name', 'email', 'role',
    'benefits', 'actions'
  ];

  // variavel angular material que receberá a lista de usuarios(array de User)
  // vinda do banco de dados
  listusers: User[] = [];


  // variavel do angular material que receberá a lista de users
  // e nela será tipado com angular material para ser usado na paginificação
  dataSource: any


  // variavel do angular material sobre paginificação
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort


  // injeções de dependencia
  constructor(private userService: UsersService, private dialog: MatDialog)
  {
    // evitando erros com MatTable
    this.dataSource = new MatTableDataSource<any>(this.listusers)
  }

  // quando inicia a page
  ngOnInit()
  {
    this.getListUsers() // chama o metod que lista usuários
  }


  // quando terminar de inicializar a page
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  // metodo q lista usuarios
  getListUsers()
  {
    this.userService.getAllUsers().subscribe({

      // dando um clg na resposta
      next: (response: any) => {
        //console.log('Lista de usuários firebase', response);

        // na variavel que é tipo array de User recebe a lista do banco
        this.listusers = response;

        // o dataSoruce recebe esses dados(listusers) mas tipado MatTable
        // com essa tipagem poderá ser usado para paginificação
        this.dataSource = new MatTableDataSource<any>(this.listusers);

        // aqui é só para garantir que o paginator funcione de verdade(opcional)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        // deixando em pt-br
        this.paginator._intl.itemsPerPageLabel = "itens por pagina";
      },
      //se der erro então(aqui é como se fosse um try catch)
      error: (erro) => {
        console.log(erro)
      }
    });

  }


  // metodo do angular material de filtro de user
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Logica do modal

  // método do modal com infos do usuário que ao clicar...Obs não esquecer do parametro tipo User
  openModalViewUser(user: User)
  {
    // dialog que tem como base o metodo do angular material que gera o modal MatDialog
    // ele vai gerar um modal com as infos que estiverem no componente ModalViewUserComponent
    this.dialog.open(ModalViewUserComponent, {

      // instruções do modal
      width: '700px',
      height: '330px',
      data: user  // vai receber um dado tipo User

    })
  }


  // método do modal que add users
  openModalAddUser()
  {
    // dialog que tem como base o metodo do angular material que gera o modal MatDialog
    // ele vai gerar um modal com as infos que estiverem no componente ModalFormUserComponent
    this.dialog.open(ModalFormUserComponent, {

      // instruções do modal
      width: '700px',
      height: '400px',

      // quando fechar o modal chama o metodo que lista usuários
      // IMPORTANTE
      // no firebase essa parte é opcional agora em uma  api c# e bd relacional precisa
    }).afterClosed().subscribe(() => this.getListUsers());
  }

  // metodo do modal para editar user
  openModalEditUser(user : User)
  {
    // dialog que tem como base o metodo do angular material que gera o modal MatDialog
    // ele vai gerar um modal com as infos que estiverem no componente ModalFormUserComponent
    this.dialog.open(ModalFormUserComponent, {

      // instruções do modal
      width: '700px',
      height: '400px',
      data: user

      // quando fechar o modal chama o metodo que lista usuários
      // IMPORTANTE
      // no firebase essa parte é opcional agora em uma  api c# e bd relacional precisa
    }).afterClosed().subscribe(() => this.getListUsers());
  }

  // deletando usuário
  deleteUser(id: string)
  {
    this.userService.deleteUser(id).then(
      (response: any) => {
        window.alert('Usuário excluido com sucesso')
      }
    )
  }

}
