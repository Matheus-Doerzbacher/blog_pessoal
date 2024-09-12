'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { PlusCircle, User, Tag } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { Post } from '@/lib/types/post'

// Simulando dados de postagens
const posts: Post[] = [
  {
    id: '1',
    titulo: 'Primeira Postagem',
    descricao:
      'Conteúdo da primeira postagem... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    data: new Date('2023-08-01'),
    autor: {
      nome: 'João Silva',
      email: 'joao.silva@example.com',
      categoria: 'ciência',
    },
    categoria: { nome: 'Ciência', valor: 'ciencia' },
  },
  {
    id: '2',
    titulo: 'Segunda Postagem',
    descricao:
      'Conteúdo da segunda postagem... Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    data: new Date('2023-08-05'),
    autor: {
      nome: 'Maria Santos',
      email: 'maria.santos@example.com',
      categoria: 'pessoal',
    },
    categoria: { nome: 'Pessoal', valor: 'pessoal' },
  },
  {
    id: '3',
    titulo: 'Terceira Postagem',
    descricao:
      'Conteúdo da terceira postagem... Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    data: new Date('2023-08-10'),
    autor: {
      nome: 'Pedro Oliveira',
      email: 'pedro.oliveira@example.com',
      categoria: 'Software',
    },
    categoria: { nome: 'Software', valor: 'software' },
  },
]

export default function Home() {
  const { user } = useAuth()
  return user ? (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Meu Blog</h1>
        <div className="flex space-x-4">
          <Link href="/configuracao">
            <Button variant="outline" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span className="mr-2">{user.nome}</span>
              <span className="sr-only">Perfil e Configurações</span>
            </Button>
          </Link>
          <Link href="/nova-postagem">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Nova Postagem
            </Button>
          </Link>
        </div>
      </header>
      <main className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="w-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl">{post.titulo}</CardTitle>
                <Badge variant="secondary" className="flex items-center">
                  <Tag className="mr-1 h-3 w-3" />
                  {post.categoria.nome}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <span>{post.autor.nome}</span>
                <span className="mx-2">•</span>
                <span>{post.data.toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent className="py-2">
              <p className="line-clamp-3">{post.descricao}</p>
            </CardContent>
            <CardFooter className="pt-2 flex justify-end">
              <Link href={`/postagem/${post.id}`}>
                <Button variant="outline">Ler mais</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  ) : (
    <div>Carregando</div>
  )
}
