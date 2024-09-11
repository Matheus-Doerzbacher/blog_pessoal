import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { hashPassword } from '@/lib/utils'
import { db } from '@/firebase/firebase'

const dbName = 'pessoas'

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

    const pessoasRef = collection(db, dbName)

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
    const pessoasRef = collection(db, dbName)
    const q = query(pessoasRef, where('email', '==', email))
    const querySnapshot = await getDocs(q)

    return !querySnapshot.empty
  } catch (erro) {
    console.error('Erro ao verificar email:', erro)
    return false
  }
}
