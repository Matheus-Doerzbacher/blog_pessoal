'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { useLayoutEffect, useState } from 'react'
import { Categoria, categorias } from '@/types/categorias'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { cadastrarPostagem } from './actions'
import { Post } from '@/types/post'
import { useToast } from '@/hooks/use-toast'
import UserNaoLogado from '@/components/user_nao_logado'

export default function PageNovaPostagem() {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState<Categoria | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useLayoutEffect(() => {
    setLoading(false)
  }, [user])

  if (loading) {
    return <div>Carregando...</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    if (!titulo || !descricao) {
      setError('Preencha todos os campos')
      return
    }

    const postagem: Post = {
      titulo,
      descricao,
      categoria: categoria ?? user!.categoria,
      autor: user!,
      data: new Date().toLocaleDateString(),
    }

    const resultado = await cadastrarPostagem(postagem)
    if (resultado.result) {
      setTitulo('')
      setDescricao('')
      setCategoria(null)
      router.replace('/')
      toast({
        title: 'Postagem criada com sucesso',
        description: 'Sua postagem foi criada com sucesso.',
      })
    } else {
      setError(resultado.message)
    }
  }

  return user ? (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="text-4xl font-bold">Meu Blog</h1>
        </Link>
        <Link href="/configuracao">
          <Button variant="outline" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span className="mr-2">{user.nome}</span>
            <span className="sr-only">Perfil e Configurações</span>
          </Button>
        </Link>
      </header>

      <main className="space-y-6">
        <h1 className="text-2xl font-bold">Nova Postagem</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">Titulo</Label>
            <Input
              id="titulo"
              type="text"
              placeholder="Digite o titulo da postagem"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Digite a descrição da postagem"
              rows={10}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>
          {user.categoria.valor === 'admin' && (
            <div className="space-y-2">
              <Label>Selecione a Categoria</Label>
              <Select
                value={categoria?.valor}
                onValueChange={(value) => {
                  const categ = categorias.find((c) => c.valor === value)
                  setCategoria(categ ?? null)
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categorias</SelectLabel>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria.valor} value={categoria.valor}>
                        {categoria.nome}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
            Publicar
          </Button>
        </form>
      </main>
    </div>
  ) : (
    <UserNaoLogado />
  )
}
