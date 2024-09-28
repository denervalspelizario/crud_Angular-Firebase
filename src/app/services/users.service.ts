import { Injectable } from '@angular/core';

// import do firestore
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  user: User = {
    name: 'Dener Pelizario',
    email: 'dener@gmail.com',
    sector: 'Tecnologia',
    role: 'Desenvolvedor FullStack'
  }


  // injeções de dependencia
  constructor(private dataBaseStore: AngularFirestore)
  {

  }

  // metodo de busca de usuarios
  getAllUsers()
  {
    // pegandos a lista de usuarios da tabela 'users'

    // se eu quisesse pegar toda a tabela bruta poderia fazer como abaixo
    //return this.dataBaseStore.collection('users')

    /* recupera todos os usuários da coleção "users" no Firestore, ordenados por nome, e os disponibiliza como um Observable que você pode usar em seu componente Angular para exibir os dados ou realizar outras operações.*/
    return this.dataBaseStore.collection('users', user => user.orderBy('name')).valueChanges({
      idField: 'firebaseId'
    }) as Observable<any[]>
  }

  // metodo de adicao de user
  addUser(user: User)
  {
    return this.dataBaseStore.collection('users').add(user);
  }

  // metodo que atualiza o user
  updateUser(userId: string, user: User)
  {
    return this.dataBaseStore.collection('users').doc(userId).update(user);
  }

  // metodo de deletar user
  deleteUser(userId: string)
  {
    return this.dataBaseStore.collection('users').doc(userId).delete();
  }
}
