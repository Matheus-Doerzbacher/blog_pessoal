'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PageConfg() {
  const router = useRouter()
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [router, user])

  return user ? (
    <div className="container mx-auto">
      <h1>Página de Configuracao</h1>
      <Button onClick={() => router.back()}>Voltar</Button>
      <Button variant={'outline'} onClick={logout}>
        Sair
      </Button>
    </div>
  ) : (
    <div>Carregando</div>
  )
}
