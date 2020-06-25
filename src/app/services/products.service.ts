import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private afStore: AngularFirestore) { }

  public getAll() {
    return this.afStore.collection<Product>('products').valueChanges();
  }

  public getOne(uid: string) {
    return this.afStore.doc<Product>(`products/${uid}`).valueChanges();
  }

  public create(product: Product) {
    return this.afStore.collection<Product>('products').add(Object.assign({}, product))
  }

  public update(uid: string, product: Product) {
    return this.afStore.doc<Product>(`products/${uid}`).set(Object.assign({}, product), {merge: true});
  }

  public delete(uid: string) {
    return this.afStore.doc<Product>(`products/${uid}`).delete();
  }
}
