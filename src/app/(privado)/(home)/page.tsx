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
import { Post } from '@/types/post'
import { useCallback, useEffect, useState } from 'react'
import { buscarPosts, buscarPostsByCategoria, deletarPostagem } from './actions'
import UserNaoLogado from '@/components/user_nao_logado'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  const buscarPostsCallback = useCallback(async () => {
    try {
      const resultado = await buscarPosts()
      if (resultado.result) {
        setPosts(resultado.posts || [])
      } else {
        console.error(resultado.message)
      }
    } catch (erro) {
      console.error('Erro ao buscar posts:', erro)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!user) return
    if (user?.categoria?.valor === 'admin') {
      buscarPostsCallback()
    } else {
      buscarPostsByCategoria(user?.categoria).then((result) => {
        if (result.result) {
          setPosts(result.posts || [])
        } else {
          console.error(result.message)
        }
        setLoading(false)
      })
    }
  }, [buscarPostsCallback, user])

  if (loading) {
    return <div>Carregando...</div>
  }

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
                <span>{new Date(post.data).toLocaleDateString()}</span>
              </div>
            </CardHeader>
            <CardContent className="py-2">
              <p className="line-clamp-3">{post.descricao}</p>
            </CardContent>
            <CardFooter className="pt-2 flex justify-end">
              {user?.id === post.autor.id && (
                <Button
                  variant="destructive"
                  onClick={() => {
                    deletarPostagem(post.id || '')
                    buscarPostsCallback()
                  }}
                >
                  Excluir
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </main>
    </div>
  ) : (
    <UserNaoLogado />
  )
}
