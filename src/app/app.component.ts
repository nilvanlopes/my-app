import { PessoaService } from './services/pessoa.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Pessoa } from './models/pessoa.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TestComponent } from './components/test/test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    TestComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'my-app';
  pessoas$ = new Observable<Pessoa[]>();

  errorMessage = '';
  sucessMessage = '';

  form_id = '';
  form_nome_pessoa = '';
  form_email_principal = '';
  form_fone_res = '';

  constructor(private PessoaService: PessoaService) {
    this.obterPessoasCadastradas();
  }
  obterPessoasCadastradas() {
    this.pessoas$ = this.PessoaService.obterPessoas();
  }
  preencherCampos(pessoa: Pessoa) {
    this.form_id = pessoa.id!.toString();
    this.form_nome_pessoa = pessoa.nome_pessoa;
    this.form_email_principal = pessoa.email_principal;
    this.form_fone_res = pessoa.fone_res;
  }
  buttonClick() {
    this.errorMessage = '';
    this.sucessMessage = '';

    if (!this.form_nome_pessoa || !this.form_email_principal) {
      return;
    }
    if (this.form_id) {
      this.atualizar();
      return;
    } else {
      this.cadastrar();
    }
  }
  cadastrar() {
    this.PessoaService.cadastrarPessoa({
      nome_pessoa: this.form_nome_pessoa,
      email_principal: this.form_email_principal,
    fone_res:this.form_fone_res}).subscribe({
      next: (_) => {
        this.errorMessage = '';
        this.sucessMessage = '';
        this.obterPessoasCadastradas();
      },
      error: (error) => {
        this.sucessMessage = '';
        this.errorMessage =
          'Ocorreu um erro desconhecido ao cadastrar a pessoa. Detalhes' +
          this.errorMessage;
      },
    });
  }
  atualizar() {
    this.PessoaService.editarPessoa({
      id: parseInt(this.form_id),
      nome_pessoa: this.form_nome_pessoa,
      email_principal: this.form_email_principal,
      fone_res:this.form_fone_res}).subscribe({
      next: (_) => {
        this.errorMessage = '';
        this.sucessMessage = '';
        this.obterPessoasCadastradas();
      },
      error: (error) => {
        this.sucessMessage = '';
        this.errorMessage =
          'Ocorreu um erro desconhecido ao alterar a pessoa. Detalhes' +
          this.errorMessage;
      },
    });
  }
  apagar(id:number){
    this.PessoaService.apagarPessoa(id).subscribe({
      next: (_) => {
        this.errorMessage = '';
        this.sucessMessage = '';
        this.obterPessoasCadastradas();
      },
      error: (error) => {
        this.sucessMessage = '';
        this.errorMessage =
          'Ocorreu um erro desconhecido ao remover a pessoa. Detalhes' +
          this.errorMessage;
      },
    });
  }
}
