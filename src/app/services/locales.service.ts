import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Local } from '../entities/local';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {
  constructor(private afStore: AngularFirestore) { }

  public getAll() {
    return this.afStore.collection<Local>('locales').valueChanges();
  }

  public getOne(uid: string) {
    return this.afStore.doc<Local>(`locales/${uid}`).valueChanges();
  }

  public create(local: Local) {
    return this.afStore.collection<Local>('locales').add(Object.assign({}, local))
  }

  public update(uid: string, local: Local) {
    return this.afStore.doc<Local>(`locales/${uid}`).set(Object.assign({}, local), {merge: true});
  }

  public delete(uid: string) {
    return this.afStore.doc<Local>(`locales/${uid}`).delete();
  }
}
