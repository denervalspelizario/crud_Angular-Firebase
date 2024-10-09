import { Component, ViewChild,  ElementRef, AfterViewInit  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {


  // cadastro
  cadastroForm!: FormGroup;


  // dados do upload da foto
  imagemPerfil: File | null = null;
  downloadURL: string | null = null;

  constructor(
    public afAuth: AngularFireAuth, // autenticação
    private afs: AngularFirestore, // banco
    private storage: AngularFireStorage, // banco de imagens
    private rota: Router){}

// ao iniciar a page..
  ngOnInit(): void {

    // pegando o valor do formulário (exceto a foto pq esta usando bootstrap)
    this.cadastroForm = new FormGroup ({
      nome: new FormControl('', [Validators.required]),
      sobreNome: new FormControl('',[Validators.required]),
      cargo: new FormControl('',[Validators.required]),
      departamento: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      senha: new FormControl('',[Validators.required]),
      confirmeSenha: new FormControl('',[Validators.required])
    });

  }


  // função que pega imagem do input
  onFileSelected(event: any) {
    this.imagemPerfil = event.target.files?.item(0) || null;
  }

  // função que salva dados na tabela usuário que será chamada após a criação da autenticação
  salvarDadosUsuario(userId: string, fotoUrl: string | null) {

    // pegando dados do formulario
    const { nome, sobreNome, cargo, departamento } = this.cadastroForm.value;

    // gerando um post na tabela usuários linkado com id e dados do formulário
    this.afs.collection('usuarios').doc(userId).set({
      nome: nome,
      sobrenome: sobreNome,
      cargo: cargo,
      departamento: departamento,
      fotoUrl: fotoUrl
    })
    .then(() => {

    })
    .catch((error) => {
      console.error('Erro ao salvar dados do usuário no Firestore:', error);
      window.alert('Erro ao salvar dados do usuário')

    });
  }


  // função que gera o cadastro
  cadastrar()
  {

    // usando desestruturação para pegar dados do formulário
    const { email, senha, confirmeSenha } = this.cadastroForm.value;

    // verificando se senhas são iguais
    if(senha !== confirmeSenha)
    {
      window.alert('As senhas inseridas não são iguais. Por favor, verifique e tente novamente')

    } else { // passou pela confirmação da senha

      // criando user via autenticação senha/email
      this.afAuth.createUserWithEmailAndPassword(email, senha)

      .then((userCredential) => { // deu certo criou a autenticação

        // pegando os dados do usuário autenticado
        const user = userCredential.user;

        // verificando se imagem foi adicionada ao cadastro
        if (this.imagemPerfil) {

          // se foi gero um string com base no id do usuário
          const filePath = `fotos_perfil/${user!.uid}`;

          // crio uma referencia de caminho(url) onde sera salvo a imagem
          const fileRef = this.storage.ref(filePath);

          // agora que tenho o caminho onde será salvo + o dado da imagem
          const task = this.storage.upload(filePath, this.imagemPerfil);

          // gerando o salvamento da imagem no caminho criado(filePath)
          // e retornando a url da imagem salva(downloadURL) que será salva no banco de dados
          task.snapshotChanges().pipe(finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.downloadURL = url;


              // depois de gerar a url da imagem salva chama a função
              // que salva os dados do usuário
              this.salvarDadosUsuario(user!.uid, this.downloadURL);

              // gera um alerta na tela
              window.alert('Usuário cadastrado com sucesso!');

              // retorna pagina de login
              this.rota.navigate(['/login']);

            });
          }))
          .subscribe();

        } else {
          // Se nenhuma imagem foi selecionada, prossiga sem a URL da imagem
          this.salvarDadosUsuario(user!.uid, null);

          // gera um alerta na tela
          window.alert('Usuário cadastrado com sucesso!');

          // retorna pagina de login
          this.rota.navigate(['/login']);

        }
      })
      .catch(error => { // se deu erro gera o alerta de erro
        console.error('Erro ao cadastrar usuário:', error);
        window.alert('Erro ao cadastrar usuário')
      });
    }
  }



}
