import { getAuth, signInWithEmailAndPassword, signOut, Auth } from 'firebase/auth';
import { app } from './FirebaseConfig';

const auth: Auth = getAuth(app);

export async function login( email: string, senha: string ): Promise<string> {
  const userId  = await signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => userCredential.user.uid)
    .catch((error) => {
      if (error.code == 'auth/user-not-found') {
        throw Error('Usuário não encontrado');
      } else if (error.code == 'auth/wrong-password') {
        throw Error('Senha inválida');
      }
    });

    return `$userId`
}

export async function logout(): Promise<void> {
  await signOut(auth);
}

export async function createUser(email, senha) {
  return await createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => userCredential.user.uid)
    .catch((error) => {
      // Lidar com erros de criação de usuário, se necessário
      throw new Error('Erro ao criar usuário: ' + error.message)
    })
}

