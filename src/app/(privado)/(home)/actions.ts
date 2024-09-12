import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/firebase'
import { Post } from '@/types/post'
import { Categoria } from '@/types/categorias'
const collectionName = 'posts'

export async function buscarPosts(): Promise<{
  result: boolean
  message: string
  posts?: Post[]
}> {
  try {
    const postsRef = collection(db, collectionName)
    const querySnapshot = await getDocs(postsRef)

    if (querySnapshot.empty) {
      return { result: false, message: 'Nenhum post encontrado' }
    }

    const posts = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        }) as Post,
    )

    return {
      result: true,
      message: 'Posts recuperados com sucesso',
      posts,
    }
  } catch (erro) {
    console.error('Erro ao buscar posts:', erro)
    return { result: false, message: 'Erro ao buscar posts' }
  }
}

export async function buscarPostsByCategoria(
  categoria: Categoria | undefined,
): Promise<{
  result: boolean
  message: string
  posts?: Post[]
}> {
  try {
    if (!categoria) {
      return { result: false, message: 'Categoria não informada' }
    }

    const postsRef = collection(db, collectionName)
    const querySnapshot = await getDocs(postsRef)

    if (querySnapshot.empty) {
      return { result: false, message: 'Nenhum post encontrado' }
    }

    const posts = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }) as Post)
      .filter((post) => post.categoria.valor === categoria.valor)

    if (posts.length === 0) {
      return {
        result: false,
        message: 'Nenhum post encontrado para esta categoria',
      }
    }

    return {
      result: true,
      message: 'Posts recuperados com sucesso',
      posts,
    }
  } catch (erro) {
    console.error('Erro ao buscar posts por categoria:', erro)
    return { result: false, message: 'Erro ao buscar posts por categoria' }
  }
}
