import { Routes } from '@angular/router';
import { CrudComponent } from './components/crud/crud.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path : '', redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'crud',component:CrudComponent}
];
