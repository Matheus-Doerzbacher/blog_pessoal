import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { Post } from '@/types/post'

const collectionName = 'posts'

export async function cadastrarPostagem(post: Post) {
  try {
    const postsRef = collection(db, collectionName)

    await addDoc(postsRef, post)
    return { result: true, message: 'Postagem cadastrada com sucesso' }
  } catch (erro) {
    console.error('Erro ao cadastrar postagem:', erro)
    return { result: false, message: 'Erro ao cadastrar postagem' }
  }
}

// export async function buscarPessoaPorEmailESenha(
//   email: string,
//   senha: string,
// ): Promise<{
//   result: boolean
//   message: string
//   pessoa?: Pessoa
// }> {
//   try {
//     const pessoasRef = collection(db, collectionName)
//     const q = query(pessoasRef, where('email', '==', email))
//     const querySnapshot = await getDocs(q)

//     if (querySnapshot.empty) {
//       return { result: false, message: 'Usuário ou senha incorreta' }
//     }

//     const pessoa = querySnapshot.docs[0].data()
//     const senhaHash = await hashPassword(senha)

//     if (pessoa.senha === senhaHash) {
//       return {
//         result: true,
//         message: 'Usuário autenticado com sucesso',
//         pessoa: {
//           id: querySnapshot.docs[0].id,
//           nome: pessoa.nome,
//           email: pessoa.email,
//           categoria: pessoa.categoria,
//         } as Pessoa,
//       }
//     } else {
//       return { result: false, message: 'Usuário ou senha incorreta' }
//     }
//   } catch (erro) {
//     console.error('Erro ao buscar pessoa:', erro)
//     return { result: false, message: 'Erro ao buscar pessoa' }
//   }
// }
