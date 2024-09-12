'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { useState } from 'react'
import { buscarPessoaPorEmailESenha, cadastrarPessoa } from './actions'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { categorias } from '@/lib/types/categorias'

export default function PageLogin() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [categoria, setCategoria] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isCadastrar, setIsCadastrar] = useState(false)

  const { login } = useAuth()

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (isCadastrar) {
      if (password !== confirmPassword) {
        setError('As senhas não coincidem.')
        return
      }

      const result = await cadastrarPessoa(name, email, password, categoria)

      if (!result.result) {
        setError(result.message)
      } else {
        setIsCadastrar(false)
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        toast({
          title: 'Conta criada com sucesso',
          description: 'Você pode agora entrar com sua conta.',
        })
      }
    } else {
      const result = await buscarPessoaPorEmailESenha(email, password)
      if (result.result) {
        const pessoa = result.pessoa
        if (pessoa) {
          login(pessoa)
          router.push('/')
        } else {
          setError('Erro ao buscar usuário')
        }
      } else {
        setError(result.message)
      }
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{isCadastrar ? 'Criar Conta' : 'Entrar'}</CardTitle>
          <CardDescription>
            {isCadastrar
              ? 'Preencha os campos abaixo para se cadastrar.'
              : 'Preencha os campos abaixo para entrar.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isCadastrar && (
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isCadastrar && (
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Senha</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
            {isCadastrar && (
              <div className="space-y-2">
                <Label>Selecione a Categoria</Label>
                <Select
                  value={categoria}
                  onValueChange={(value) => setCategoria(value)}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categorias</SelectLabel>
                      {categorias.map((categoria) => (
                        <SelectItem
                          key={categoria.valor}
                          value={categoria.valor}
                        >
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
              {isCadastrar ? 'Cadastrar' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            {isCadastrar ? 'Já tem uma conta?' : 'Não tem uma conta?'}{' '}
            <Button
              variant="link"
              onClick={() => setIsCadastrar(!isCadastrar)}
              className="text-primary hover:underline"
            >
              {isCadastrar ? 'Entrar' : 'Cadastrar'}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
