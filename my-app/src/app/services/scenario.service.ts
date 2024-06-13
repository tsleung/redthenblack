import { Injectable } from '@angular/core';
import { Component } from '../utils/maya-ecs-components';
import { SavedDocument } from './firebase.service';
import { DatabaseService } from './database.service';

export interface Scenario extends SavedDocument{
  components: Component[]  
}


@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(readonly firebaseService: DatabaseService) { }
}
