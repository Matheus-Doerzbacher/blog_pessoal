import { Categoria } from './categorias'
import { Pessoa } from './pessoa'

export interface Post {
  id?: string
  titulo: string
  descricao: string
  data: Date
  categoria: Categoria
  autor: Pessoa
}
