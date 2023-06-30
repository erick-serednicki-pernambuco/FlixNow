import { getFirestore, collection, addDoc, getDocs, query, where, limit, Firestore } from 'firebase/firestore';
import { app } from './FirebaseConfig';

const db: Firestore = getFirestore(app);

export async function listTodos(): Promise<any[]> {
  let tarefas: any[] = [];
  const response = await getDocs(
    query(collection(db, "tarefas"), where("prioridade", '==', 2), limit(10))
  );
  response.forEach((doc) => {
    tarefas.push({ key: doc.id, ...doc.data() });
  });
  return tarefas;
}

export async function insertTodo(todo: { tarefa: string; prioridade: number }): Promise<void> {
  await addDoc(collection(db, 'tarefas'), {
    tarefa: todo.tarefa,
    prioridade: +todo.prioridade
  });
}