import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewUserComponent } from './view-user/view-user.component';
import { UserCreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [{ path: 'view-user', component: UserViewUserComponent },
{ path: 'create-user', component: UserCreateUserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
