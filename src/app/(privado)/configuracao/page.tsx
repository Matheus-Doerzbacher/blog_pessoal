'use client'

import { Button } from '@/components/ui/button'
import UserNaoLogado from '@/components/user_nao_logado'
import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'

export default function PageConfg() {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { user, logout } = useAuth()

  useLayoutEffect(() => {
    setLoading(false)
  }, [user])

  if (loading) {
    return <div>Carregando...</div>
  }

  return user ? (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <Link href="/">
          <h1 className="text-4xl font-bold">Meu Blog</h1>
        </Link>
        <Button
          onClick={() => {
            logout()
            router.replace('/login')
          }}
        >
          Logout
        </Button>
      </header>
      <main className=" flex flex-col space-y-6 items-center">
        <h1 className="text-3xl font-bold mb-6">Informações do Usuário</h1>
        <p className="text-2xl font-bold">{user.nome}</p>
        <p className="text-xl">{user.email}</p>
        <p className="text-xl">
          <b>Categoria:</b> {user.categoria.nome}
        </p>
      </main>
    </div>
  ) : (
    <UserNaoLogado />
  )
}
