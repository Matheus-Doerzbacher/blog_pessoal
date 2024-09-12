'use client'

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { Pessoa } from '@/types/pessoa'
import Cookies from 'js-cookie'
import { SignJWT, jwtVerify } from 'jose'

interface AuthContextType {
  user: Pessoa | null
  loading: boolean
  login: (user: Pessoa) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const SECRET_KEY = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_TOKEN_SECRET_KEY,
)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Pessoa | null>(null)
  const [loading, setLoading] = useState(true)

  const getUser = React.useCallback(async () => {
    const token = Cookies.get('auth_token')
    if (token) {
      const { payload } = await jwtVerify(token, SECRET_KEY)
      const user = payload as unknown as Pessoa
      setUser(user)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getUser()
  }, [getUser])

  const login = (user: Pessoa) => {
    if (SECRET_KEY) {
      if (typeof user === 'object' && user !== null) {
        const userPayload = {
          id: user.id,
          email: user.email,
          nome: user.nome,
          categoria: user.categoria,
        }

        new SignJWT(userPayload)
          .setProtectedHeader({ alg: 'HS256' })
          .setExpirationTime('1h')
          .sign(SECRET_KEY)
          .then((token) => {
            Cookies.set('auth_token', token, {
              secure: true,
              sameSite: 'strict',
            })
            setUser(user)
          })
          .catch((error) => {
            console.error('Erro ao gerar o token', error)
          })
      } else {
        console.error('O usuário fornecido não é um objeto válido')
      }
    } else {
      console.error('Erro ao gerar o token: SECRET_KEY não está definido')
    }
  }

  const logout = () => {
    Cookies.remove('auth_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
