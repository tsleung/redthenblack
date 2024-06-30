import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { User } from 'firebase/auth';
import { DocumentData, DocumentReference, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';

// Inteface to interact with either firebase or local in memory DB
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  auth = this.firebaseService.auth;
  serverMessenger = this.firebaseService.serverMessenger;
  online = true;
  constructor(
    private firebaseService: FirebaseService,
  ) { }

  private attempt(online, offline) {
    return this.online ? online() : offline();
  }
  loadActiveScenario(): Promise<DocumentData> {
    // return this.firebaseService.loadActiveScenario();
    return this.attempt(
      () => this.firebaseService.loadActiveScenario(),
      () => new Promise(resolve=>{
        resolve({} as DocumentData);
      })
    );
  }
  getUser():Promise<User> {
    // return this.firebaseService.getUser();
    return this.attempt(
      () => this.firebaseService.getUser(),
      () => new Promise(resolve=>{
        const user: User = {} as User;
        resolve(user)
      })
    );
    
  }  
  loadAlternativeScenariosForCurrentUser() {
    // return this.firebaseService.loadAlternativeScenariosForCurrentUser();
    return this.attempt(
      () => this.firebaseService.loadAlternativeScenariosForCurrentUser(),
      () => new Promise(resolve=>{
        const user: User = {} as User;
        resolve({} as DocumentData);
      })
    );
  }
  convertSavedActiveScenarioToAlternativeScenario() {
    // return this.firebaseService.convertSavedActiveScenarioToAlternativeScenario();
    return this.attempt(
      () => this.firebaseService.convertSavedActiveScenarioToAlternativeScenario(),
      () => new Promise(resolve=>{
        resolve({} as DocumentData);
      })
    );
  }
  convertAlternativeScenarioToActiveScenario(id: string) {
    // return this.firebaseService.convertAlternativeScenarioToActiveScenario(id);
    return this.attempt(
      () => this.firebaseService.convertAlternativeScenarioToActiveScenario(id),
      () => new Promise(resolve=>{
        resolve(void 0);
      })
    );
  }

  deleteAlternativeScenario(id) {
    // return this.firebaseService.deleteAlternativeScenario(id);
    return this.attempt(
      () => this.firebaseService.deleteAlternativeScenario(id),
      () => new Promise(resolve=>{
        resolve(void 0);
      })
    );
  }
  signInAndSave(json) {
    // return this.firebaseService.signInAndSave(json);
    return this.attempt(
      () => this.firebaseService.signInAndSave(json),
      () => new Promise(resolve=>{
        resolve(void 0);
      })
    );
  }
  setActiveScenario(json) {
    // return this.firebaseService.setActiveScenario(json);
    return this.attempt(
      () => this.firebaseService.setActiveScenario(json),
      () => new Promise(resolve=>{
        resolve(void 0);
      })
    );
  }
  deleteActiveScenario() {
    // return this.firebaseService.deleteActiveScenario();
    return this.attempt(
      () => this.firebaseService.deleteActiveScenario(),
      () => new Promise(resolve=>{
        resolve(void 0);
      })
    );
  } 
  login() {
    // return this.firebaseService.login();
    return this.attempt(
      () => this.firebaseService.login(),
      () => new Promise(resolve=>{
        resolve(void 0);
      })
    );
  }
  logout() {
    // return this.firebaseService.logout();
    return this.attempt(
      () => this.firebaseService.logout(),
      () => new Promise(resolve=>{
        resolve(void 0);
      })
    );
  }
  listSharedSheetsForCurrentUser() {
    // return this.firebaseService.listSharedSheetsForCurrentUser();
    return this.attempt(
      () => this.firebaseService.listSharedSheetsForCurrentUser(),
      () => new Promise(resolve=>{
        resolve({} as QueryDocumentSnapshot);
      })
    );
  }
  createSharedSheet(title, json) {
    // return this.firebaseService.createSharedSheet(title, json);
    return this.attempt(
      () => this.firebaseService.createSharedSheet(title, json),
      () => new Promise(resolve=>{
        resolve({} as DocumentReference);
      })
    );
  }
  saveSharedSheet(json, id) {
    // return this.firebaseService.saveSharedSheet(json, id);
    return this.attempt(
      () => this.firebaseService.saveSharedSheet(json, id),
      () => new Promise(resolve=>{
        resolve(void 0);
      })
    );
  }
  loadSharedSheet(id):Promise<DocumentSnapshot<DocumentData, DocumentData>> {
    // return this.firebaseService.loadSharedSheet(id);
    return this.attempt(
      () => this.firebaseService.loadSharedSheet(id),
      () => new Promise(resolve=>{
        resolve({} as DocumentSnapshot);
      })
    );
  }
  loadAlternativeScenario(id):Promise<DocumentSnapshot<DocumentData, DocumentData>> {
    // return this.firebaseService.loadAlternativeScenario(id);
    return this.attempt(
      () => this.firebaseService.loadAlternativeScenario(id),
      () => new Promise(resolve=>{
        resolve({} as DocumentSnapshot);
      })
    );
  }
}

export function data(documentSnapshot: DocumentSnapshot):DocumentData {
  return documentSnapshot.data ? 
    documentSnapshot.data() : {} as DocumentData;
}