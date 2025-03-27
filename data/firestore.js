// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore, collection, getDocs, getDoc, setDoc, deleteDoc, updateDoc, doc, Timestamp} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

//LIST
export async function fetchTodos(){
    const querySnapshot = await getDocs(collection(db, "todos"));

    if (querySnapshot.empty) {
        return [];
    }

    const fecchedTodos = [];

    querySnapshot.forEach((doc) => {
        console.log(doc.id, "===>", doc.data());

        const aTodo = {
            id:doc.id,
            title:doc.data()["title"],
            is_done:doc.data()["is_done"],
            created_at:doc.data()["created_at"].toDate(),
        }
        fecchedTodos.push(aTodo);
    });

    return fecchedTodos;
}

//INSERT
export async function addATodo({title}){
    const newTodoRef = doc(collection(db, "todos"));

    const createdAtTimestamp = Timestamp.fromDate(new Date());

    const newTodoData = {
        id : newTodoRef.id,
        title,
        is_done:false,
        created_at:createdAtTimestamp
    }

    await setDoc(newTodoRef, newTodoData);

    return {
        id : newTodoRef.id,
        title:title,
        is_done:false,
        created_at:createdAtTimestamp.toDate()
    };
}

//GET
export async function fetchATodo(id){
    if(id === null){
        return null;
    }
    const newDocRef = doc(db, "todos", id);

    const todoDocSnap = await getDoc(newDocRef);

    if (todoDocSnap.exists()){
        console.log("Document data:", todoDocSnap.data());

        const fetchednTodo = {
            id : todoDocSnap.id,
            title : todoDocSnap.data()["title"],
            is_done:todoDocSnap.data()["is_done"],
            created_at:todoDocSnap.data()["created_at"].toDate(),
        }

        return fetchednTodo;

    }else{
        console.log("no data")
        return null;

    }   
}

//DELETE
export async function deleteATodo(id){
    const fetchedTodo = await fetchATodo(id);

    if(fetchedTodo === null){
        return null;
    }
  
    await deleteDoc(doc(db, "todos", id));
    
    return fetchedTodo;
}

//UPDATE
export async function editATodo(id, {title, is_done}){
    const fetchedTodo = await fetchATodo(id);

    if(fetchedTodo === null){
        return null;
    }

    const todoRef = doc(db, "todos", id);
  
    const updatedTodo = await updateDoc(todoRef, {title, is_done});
    
    return {
        id,
        title,
        is_done,
        created_at:fetchedTodo.created_at,
    };
}

module.exports = {fetchTodos, addATodo, fetchATodo, deleteATodo, editATodo};
