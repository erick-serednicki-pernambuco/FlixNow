import { getFirestore, collection, addDoc, getDocs, query, where, limit, Firestore, deleteDoc } from 'firebase/firestore';
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


/*const adicionarAosFavoritos = () => {params
  const userId = firebase.auth().currentUser?.uid;

  if (userId && filme) {
    db.collection('mylist').doc(userId).set({
      userId: userId,
      movies: firebase.firestore.FieldValue.arrayUnion(filme),
    })
    .then(() => {
      console.log('Filme adicionado aos favoritos');
    })
    .catch(Error) {
      if (Error instanceof Error) {
        console.error('Erro ao adicionar filme aos favoritos:', Error);}
      }
    }
};*/


export async function listaFavoritos(userId: string | null) {
  const favoritos: any[] = [];
  const resposta = await getDocs(
    query(
      collection(db, "Favoritos"),
      where("userId", "==", userId)
    )
  );

  resposta.forEach((doc) => {
    favoritos.push({ key: doc.id, ...doc.data() });
  });

  return favoritos;
}


export async function getAll(favorito: { userId: string | null}) {
  const resposta = await getDocs(
    query(
      collection(db, "Favoritos"),
      where("userId", "==", favorito.userId),
    )
  );
  resposta.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}


export async function insereFavorito(favorito : object) {
  await addDoc(collection(db, "Favoritos"), favorito)
}

export async function removeFavorito(favorito: { userId: string | null, id: string | undefined }) {
  const resposta = await getDocs(
    query(
      collection(db, "Favoritos"),
      where("userId", "==", favorito.userId),
      where("id", "==", favorito.id)
    )
  );
  resposta.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}