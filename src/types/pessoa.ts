import { Categoria } from './categorias'

export interface Pessoa {
  id?: string
  nome: string
  email: string
  categoria: Categoria
}
