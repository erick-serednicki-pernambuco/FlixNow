import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { app } from './FirebaseConfig'

const auth = getAuth(app)

export async function login(email, senha) {
  return await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => userCredential.user.uid)
    .catch((error) => {
      if (error.code === 'auth/user-not-found') {
        throw new Error('Usuário não encontrado')
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Senha inválida')
      }
    })
}

export async function logout() {
  await signOut(auth)
}

export async function createUser(email, senha) {
  return await createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => userCredential.user.uid)
    .catch((error) => {
      // Lidar com erros de criação de usuário, se necessário
      throw new Error('Erro ao criar usuário: ' + error.message)
    })
}
