import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, Firestore, setDoc, doc, getDocs, getDoc, deleteDoc, query, where, DocumentData, DocumentSnapshot } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, GoogleAuthProvider, User, getAuth, signInWithCustomToken, signInWithPopup, signOut } from "firebase/auth";
import { BehaviorSubject, Subject } from 'rxjs';

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

    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }

    try {
      await setDoc(doc(this.db, "ActiveScenario", currentUser.uid), json);
      console.log("Document written with ID: ", json);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    this.serverMessenger.next({type: ServerMessageType.UPDATE});
  }

  async deleteActiveScenario() {
    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }

    await deleteDoc(doc(this.db, "ActiveScenario", currentUser.uid));
    this.serverMessenger.next({type: ServerMessageType.DELETE});
  }

  async loadActiveScenario(): Promise<DocumentData> {
    const promise = new Promise(resolve => {
      this.auth.onAuthStateChanged(async currentUser => {
        
        if (currentUser.isAnonymous) {
          return;
        }

        const docRef = doc(this.db, "ActiveScenario", currentUser.uid);
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

  async saveAlternativeScenario(title: string, json: object) {
    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = await addDoc(collection(this.db, "AlternativeScenario"), {
          ...json,
          'uid': currentUser.uid,
          'title': title,
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

  async loadAlternativeScenariosForCurrentUser() {
    const promise = new Promise(resolve => {
      this.auth.onAuthStateChanged(async currentUser => {
        console.log('current user', currentUser)
        if (currentUser.isAnonymous) {
          return;
        }
        const dbRef = collection(this.db, "AlternativeScenario");
    
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

  convertSavedActiveScenarioToAlternativeScenario() {
    return this.loadActiveScenario().then(activeScenario => {
      const title = window.prompt('Title');
      this.serverMessenger.next({type: ServerMessageType.CREATE});
      return this.saveAlternativeScenario(title, activeScenario);
    });
  }

  convertAlternativeScenarioToActiveScenario(id: string) {
    return this.loadAlternativeScenario(id).then(doc => {
      this.serverMessenger.next({type: ServerMessageType.UPDATE});
      return this.setActiveScenario(doc.data());
    });
  }

  async loadAlternativeScenario(id: string):
    Promise<DocumentSnapshot<DocumentData, DocumentData>> {
    const promise: Promise<DocumentSnapshot<DocumentData, DocumentData>> = new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged(async currentUser => {
        console.log('current user', currentUser)
        
        if (currentUser.isAnonymous) {
          reject();
        }
    
        const docRef = doc(this.db, "AlternativeScenario", id);
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

  async deleteAlternativeScenario(id: string) {
    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }

    await deleteDoc(doc(this.db, "AlternativeScenario", id));
    this.serverMessenger.next({type: ServerMessageType.DELETE});
  }
}
