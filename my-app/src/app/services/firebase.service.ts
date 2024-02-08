import { Injectable } from '@angular/core';
import { getFirestore, collection, addDoc, Firestore, setDoc, doc, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, GoogleAuthProvider, User, getAuth, signInWithCustomToken, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9mymqUz2n07EjiMj37s3RXR1W_HkeIzc",
  authDomain: "red-then-black.firebaseapp.com",
  projectId: "red-then-black",
  storageBucket: "red-then-black.appspot.com",
  messagingSenderId: "1026291718110",
  appId: "1:1026291718110:web:384ca314abc411aa13ef4f",
  measurementId: "G-30KGKME2KS"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
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

  }

  async deleteActiveScenario() {
    const currentUser = this.auth.currentUser;
    if (currentUser.isAnonymous) {
      return;
    }

    await deleteDoc(doc(this.db, "ActiveScenario", currentUser.uid));
  }

  async loadActiveScenario() {
    const currentUser = this.auth.currentUser;
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

    return docSnap.data();
  }
}
