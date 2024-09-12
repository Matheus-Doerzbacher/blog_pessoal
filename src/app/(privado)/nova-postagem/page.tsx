'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function PageNewPost() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.replace('/login')
    }
  }, [router, user])

  return user ? (
    <div className="container mx-auto">
      <h1>Nova Postagem</h1>
      <Button onClick={() => router.back()}>Voltar</Button>
    </div>
  ) : (
    <div>Carregando</div>
  )
}
