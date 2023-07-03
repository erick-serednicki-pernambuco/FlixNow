import { getFirestore, collection, addDoc, getDocs, query, where, limit, Firestore } from 'firebase/firestore';
import { app } from './FirebaseConfig';

const db: Firestore = getFirestore(app);

export async function listMovies(): Promise<any[]> {
  let tarefas: any[] = [];
  const response = await getDocs(
    query(collection(db, "movies") )
  );
  response.forEach((doc) => {
    tarefas.push({ key: doc.id, ...doc.data() });
  });
  return tarefas;
}


export async function insertMinhaLista(movie: { id: string }): Promise<void> {
  await addDoc(collection(db, 'movies'), {
    filme: movie.id,
  });
}