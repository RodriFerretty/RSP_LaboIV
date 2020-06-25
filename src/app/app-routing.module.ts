import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProductComponent } from './components/product/create-product/create-product.component';
import { CreateLocalComponent } from './components/local/create-local/create-local.component';
import { SessionComponent } from './components/session/session/session.component';
import { HomeComponent } from './components/home/home/home.component';
import { AuthGuard } from './Guard/auth.guard';


const routes: Routes = [
  {
    path: 'addProduct',
    component: CreateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addLocal',
    component: CreateLocalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'session',
    component: SessionComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: '/home',
      pathMatch: 'full'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
