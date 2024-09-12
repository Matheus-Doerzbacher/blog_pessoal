import Link from 'next/link'

export default function UserNaoLogado() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold">
        Você precisa estar logado para acessar esta página
      </h1>
      <Link href="/login" className="text-blue-500 hover:text-blue-600">
        vá para a página de login
      </Link>
    </div>
  )
}
