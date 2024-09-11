import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { hashPassword } from '@/lib/utils'
import { db } from '@/firebase/firebase'
import { Pessoa } from '@/lib/types/pessoa'

const collectionName = 'pessoas'

export async function cadastrarPessoa(
  nome: string,
  email: string,
  senha: string,
) {
  try {
    const emailExistente = await verificarEmailExistente(email)
    if (emailExistente) {
      return { result: false, message: 'Email já cadastrado' }
    }

    const pessoasRef = collection(db, collectionName)

    const hashedPassword = await hashPassword(senha)

    const novaPessoa = {
      nome,
      email,
      senha: hashedPassword,
    }

    const docRef = await addDoc(pessoasRef, novaPessoa)
    console.log('Pessoa cadastrada com ID:', docRef.id)
    return { result: true, message: 'Pessoa cadastrada com sucesso' }
  } catch (erro) {
    console.error('Erro ao cadastrar pessoa:', erro)
    return { result: false, message: 'Erro ao cadastrar pessoa' }
  }
}

export async function verificarEmailExistente(email: string): Promise<boolean> {
  try {
    const pessoasRef = collection(db, collectionName)
    const q = query(pessoasRef, where('email', '==', email))
    const querySnapshot = await getDocs(q)

    return !querySnapshot.empty
  } catch (erro) {
    console.error('Erro ao verificar email:', erro)
    return false
  }
}

export async function buscarPessoaPorEmailESenha(
  email: string,
  senha: string,
): Promise<{
  result: boolean
  message: string
  pessoa?: Pessoa
}> {
  try {
    const pessoasRef = collection(db, collectionName)
    const q = query(pessoasRef, where('email', '==', email))
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      return { result: false, message: 'Usuário ou senha incorreta' }
    }

    const pessoa = querySnapshot.docs[0].data()
    const senhaHash = await hashPassword(senha)

    if (pessoa.senha === senhaHash) {
      return {
        result: true,
        message: 'Usuário autenticado com sucesso',
        pessoa: {
          id: querySnapshot.docs[0].id,
          nome: pessoa.nome,
          email: pessoa.email,
        } as Pessoa,
      }
    } else {
      return { result: false, message: 'Usuário ou senha incorreta' }
    }
  } catch (erro) {
    console.error('Erro ao buscar pessoa:', erro)
    return { result: false, message: 'Erro ao buscar pessoa' }
  }
}
