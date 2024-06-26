import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, Firestore, setDoc, doc, getDocs, getDoc, deleteDoc, query, where, DocumentData, DocumentSnapshot, Timestamp, DocumentReference, QuerySnapshot, QueryDocumentSnapshot } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, GoogleAuthProvider, User, getAuth, signInWithCustomToken, signInWithPopup, signOut } from "firebase/auth";
import { BehaviorSubject, Subject } from 'rxjs';

enum DocumentCollection {
  ActiveScenario='ActiveScenario',
  AlternativeScenario='AlternativeScenario',
  SharedSheet='SharedSheet',
}

const firebaseConfig = {
  apiKey: "AIzaSyB9mymqUz2n07EjiMj37s3RXR1W_HkeIzc",
  authDomain: "red-then-black.firebaseapp.com",
  projectId: "red-then-black",
  storageBucket: "red-then-black.appspot.com",
  messagingSenderId: "1026291718110",
  appId: "1:1026291718110:web:384ca314abc411aa13ef4f",
  measurementId: "G-30KGKME2KS"
};

export enum ServerMessageType {
  INIT,
  CREATE,
  READ,
  DELETE,
  UPDATE,
}
export interface ServerMessage {
  type: ServerMessageType
}

export interface SavedDocument {
  title: string;
  uid: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;

  serverMessenger = new BehaviorSubject<ServerMessage>({type:ServerMessageType.INIT})

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
    console.log('auth', this.auth)

  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('logged out')
      // Sign-out successful.
      // window.location.reload();
    }).catch((error) => {
      console.log('failed to logged out')
      // An error happened.
    });

  }

  getUser():Promise<User> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user:User) => {
        resolve(user);
      });
    });
  }

  signInAndSave(json: object) {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('saving', json)
        return this.setActiveScenario(json);
      }).then(() => {
        window.location.reload();
      });
  }


  login() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log('user', user)
        // ...
        
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.error(error)
      });
  }

  async setActiveScenario(json: object) {
    return this.setForUser(DocumentCollection.ActiveScenario, json);
  }

  async deleteActiveScenario() {
    return this.deleteDocumentForCurrentUser(DocumentCollection.ActiveScenario);
  }

  async loadActiveScenario(): Promise<DocumentData> {
    return this.loadDocumentForCurrentUser(DocumentCollection.ActiveScenario);
  }

  async saveAlternativeScenario(title: string, json: object) {
    return this.addDocument(DocumentCollection.AlternativeScenario, title, json);
  }

  async loadAlternativeScenariosForCurrentUser() {
    return this.loadCollectionForCurrentUser(DocumentCollection.AlternativeScenario);
  }

  async loadAlternativeScenario(id: string){
    return this.loadDocument(DocumentCollection.AlternativeScenario, id);
  }

  async deleteAlternativeScenario(id: string) {
    return this.deleteDocument(DocumentCollection.AlternativeScenario, id);
  }

  convertSavedActiveScenarioToAlternativeScenario() {
    return this.loadActiveScenario().then(activeScenario => {
      const title = window.prompt('Title');
      return this.saveAlternativeScenario(title, activeScenario);
    });
  }

  convertAlternativeScenarioToActiveScenario(id: string) {
    return this.loadAlternativeScenario(id).then(doc => {
      return this.setActiveScenario(doc.data());
    });
  }


  // ShareSheet is a single page that is quick to setup, like gist or clip
  createSharedSheet(title: string, json: object) {
    return this.addDocument(
      DocumentCollection.SharedSheet,
      title,
      json,
    );
  }

  saveSharedSheet(json:object, id: string ) {
    return this.saveForId(
      DocumentCollection.SharedSheet,
      json,
      id,
    )
  }

  listSharedSheetsForCurrentUser(): Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]> {
    return this.loadCollectionForCurrentUser(DocumentCollection.SharedSheet);
  }

  loadSharedSheet(id: string): Promise<DocumentSnapshot<DocumentData, DocumentData>> {
    return this.loadDocument(DocumentCollection.SharedSheet, id);
  }

  private async loadDocumentForCurrentUser(
    documentCollection:DocumentCollection
  ) {
    const promise = new Promise(resolve => {
      this.auth.onAuthStateChanged(async currentUser => {
        
        if (currentUser.isAnonymous) {
          return;
        }

        const docRef = doc(this.db, documentCollection, currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }

        resolve( docSnap.data());
        this.serverMessenger.next({type: ServerMessageType.READ});
      });
    });
    
    return promise;
  }
  private async addDocument(
    documentCollection: DocumentCollection, 
    title: string, 
    json: object
  ): Promise<DocumentReference<DocumentData, DocumentData>>{
    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      try {
        const timestamp = Timestamp.now();
        const docRef = await addDoc(collection(this.db, documentCollection), {
          ...json,
          'uid': currentUser.uid,
          'title': title,
          createdAt: timestamp,
          updatedAt: timestamp,
        });
        
        console.log("Document written with ID: ", json);
        this.serverMessenger.next({type: ServerMessageType.CREATE});
        resolve(docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
        reject('error adding document');
      }
    });
    
  }
  private async loadCollectionForCurrentUser(
    documentCollection: DocumentCollection, 
  ) :Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>{
    const promise = new Promise<QueryDocumentSnapshot<DocumentData, DocumentData>[]>((resolve, err) => {
      this.auth.onAuthStateChanged(async currentUser => {
        console.log('current user', currentUser)
        if (currentUser.isAnonymous) {
          err();
        }
        const dbRef = collection(this.db, documentCollection);
    
        const q = query(dbRef, where("uid", "==", currentUser.uid));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
    
        console.log('query snapshot', querySnapshot)
        this.serverMessenger.next({type: ServerMessageType.READ});
        resolve( querySnapshot.docs);
      });
    });
    
    return promise;
  }

  private async deleteDocumentForCurrentUser(
    documentCollection: DocumentCollection
  ) {
    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }

    await deleteDoc(doc(this.db, documentCollection, currentUser.uid));
    this.serverMessenger.next({type: ServerMessageType.DELETE});
  }

  private async deleteDocument(
    documentCollection: DocumentCollection, 
    id: string
  ) {
    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }
  
    await deleteDoc(doc(this.db, documentCollection, id));
    this.serverMessenger.next({type: ServerMessageType.DELETE});
  }

  private async setForUser(
    documentCollection: DocumentCollection, 
    json: object,
  ) {

    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }

    try {
      const timestamp = Timestamp.now();
      
      const modifiedJson = {
        createdAt: timestamp,
        ...json,
        updatedAt: timestamp,
      };

      await setDoc(
        doc(this.db, documentCollection, currentUser.uid), 
        modifiedJson
      );
      console.log("Document written with ID: ", json);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    this.serverMessenger.next({type: ServerMessageType.UPDATE});
  }

  private async saveForId(documentCollection: DocumentCollection, 
    json: object, id: string) {

    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }

    try {
      const timestamp = Timestamp.now();
      
      const modifiedJson = {
        createdAt: timestamp,
        ...json,
        updatedAt: timestamp,
      };
      console.log('modifiedJson', modifiedJson)
      
      await setDoc(
        doc(this.db, documentCollection, id), 
        modifiedJson
      );
      console.log("Document written with ID: ", json);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    this.serverMessenger.next({type: ServerMessageType.UPDATE});
  }

  private async loadDocument(
    documentCollection: DocumentCollection, 
    id: string
  ):
  Promise<DocumentSnapshot<DocumentData, DocumentData>> {
  const promise: Promise<DocumentSnapshot<DocumentData, DocumentData>> = new Promise((resolve, reject) => {
    this.auth.onAuthStateChanged(async currentUser => {
      console.log('current user', currentUser)
      
      if (currentUser.isAnonymous) {
        reject();
      }
  
      const docRef = doc(this.db, documentCollection, id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
  
      this.serverMessenger.next({type: ServerMessageType.READ});
      resolve(docSnap);
    });
    
  });
  
  return promise;
  }

}

