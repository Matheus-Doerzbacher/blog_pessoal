import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function hashPassword(password: string): Promise<string> {
  // Cria um novo objeto TextEncoder para codificar a senha em bytes
  const encoder = new TextEncoder()
  // Codifica a senha em um array de bytes
  const data = encoder.encode(password)
  // Gera um hash SHA-256 da senha codificada
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  // Converte o buffer do hash em uma string hexadecimal
  return (
    Array.from(new Uint8Array(hashBuffer))
      // Converte cada byte em uma string hexadecimal de 2 dígitos
      .map((b) => b.toString(16).padStart(2, '0'))
      // Junta todos os bytes em uma única string
      .join('')
  )
}
