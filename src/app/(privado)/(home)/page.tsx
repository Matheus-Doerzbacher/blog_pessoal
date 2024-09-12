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

// Simulando dados de postagens
const posts = [
  {
    id: 1,
    title: 'Primeira Postagem',
    content:
      'Conteúdo da primeira postagem... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    date: '2023-08-01',
    author: 'João Silva',
    category: 'Tecnologia',
  },
  {
    id: 2,
    title: 'Segunda Postagem',
    content:
      'Conteúdo da segunda postagem... Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    date: '2023-08-05',
    author: 'Maria Santos',
    category: 'Lifestyle',
  },
  {
    id: 3,
    title: 'Terceira Postagem',
    content:
      'Conteúdo da terceira postagem... Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    date: '2023-08-10',
    author: 'Pedro Oliveira',
    category: 'Viagens',
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
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <Badge variant="secondary" className="flex items-center">
                  <Tag className="mr-1 h-3 w-3" />
                  {post.category}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2 h-4 w-4" />
                <span>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{post.date}</span>
              </div>
            </CardHeader>
            <CardContent className="py-2">
              <p className="line-clamp-3">{post.content}</p>
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
