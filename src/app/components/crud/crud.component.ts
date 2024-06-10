import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../header/header.component';
import { PessoaService } from '../../services/pessoa.service';
import { Observable } from 'rxjs';
import { Pessoa } from '../../models/pessoa.model';
@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    HeaderComponent,
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss'
})
export class CrudComponent {
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
