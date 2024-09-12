'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user === null) {
      router.push('/login')
    }
  }, [loading, user, router])

  if (loading) {
    return <div>Carregando...</div>
  }

  return (
    user && (
      <div>
        <h1>Olá Mundo</h1>
        <p>Bem-vindo à página inicial!</p>
        <Button
          onClick={() => {
            logout()
            router.push('/login')
          }}
        >
          Sair
        </Button>
      </div>
    )
  )
}
