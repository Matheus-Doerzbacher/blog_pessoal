'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useRouter, useParams } from 'next/navigation'
import { useEffect } from 'react'

export default function PagePostagem() {
  const router = useRouter()
  const { user } = useAuth()
  const { id } = useParams()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [router, user])

  return user ? (
    <div className="container mx-auto">
      <h1>Página da Postagem {id}</h1>
      <Button onClick={() => router.back()}>Voltar</Button>
    </div>
  ) : (
    <div>Carregando</div>
  )
}
