import { PessoaService } from './services/pessoa.service';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Pessoa } from './models/pessoa.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'aula8';
  pessoas$ = new Observable<Pessoa[]>
  constructor(private PessoaService: PessoaService){
    this.obterPessoasCadastradas();
  }
  obterPessoasCadastradas(){
    this.pessoas$ = this.PessoaService.obterPessoas();
  }
}
