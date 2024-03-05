import { Injectable } from '@angular/core';
import { Component } from '../utils/maya-ecs-components';
import { FirebaseService, SavedDocument } from './firebase.service';


export interface Scenario extends SavedDocument{
  components: Component[]  
}


@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(readonly firebaseService: FirebaseService) { }
}
