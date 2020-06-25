import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SessionComponent } from './components/session/session/session.component';
import { SignUpComponent } from './components/session/sign-up/sign-up.component';
import { LoginComponent } from './components/session/login/login.component';
import { CreateLocalComponent } from './components/local/create-local/create-local.component';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { HomeComponent } from './components/home/home/home.component';
import { ProductsTableComponent } from './components/home/products-table/products-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SessionComponent,
    SignUpComponent,
    LoginComponent,
    CreateLocalComponent,
    CreateProductComponent,
    HomeComponent,
    ProductsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
