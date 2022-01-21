import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserViewUserComponent } from './view-user/view-user.component';
import { UserCreateUserComponent } from './create-user/create-user.component';

const COMPONENTS: any[] = [UserViewUserComponent, UserCreateUserComponent];
const COMPONENTS_DYNAMIC: any[] = [];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_DYNAMIC
  ]
})
export class UserModule { }
