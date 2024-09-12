import { Categoria } from './categorias'
import { Pessoa } from './pessoa'

export interface Post {
  id?: string
  titulo: string
  descricao: string
  data: string
  categoria: Categoria
  autor: Pessoa
}
