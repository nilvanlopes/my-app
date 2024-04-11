export type Pessoa = {
  id:number,
  nome_pessoa:string,
  email_principal:string
  fone_cel:string
}
export type PessoaCadastrar = Omit<Pessoa,'id'>
