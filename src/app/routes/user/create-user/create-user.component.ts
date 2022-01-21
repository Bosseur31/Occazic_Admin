import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserDataService} from "../data.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [UserDataService]

})
export class UserCreateUserComponent implements OnInit {

  // @ts-ignore
  UserForm: FormGroup;

  constructor(private _formbuilder: FormBuilder, private dataSrv: UserDataService, private route: Router) { }

  ngOnInit() {
    this.UserForm = this._formbuilder.group({
      username: '',
      password: ''
    });
  }

  async onSubmit() {
    let username = await this.UserForm.value.username;
    let password = await this.UserForm.value.password;
    const data = await this.dataSrv.postUser(username, password).toPromise();
    console.log('Création User :')
    console.log(data)
    await this.route.navigateByUrl('/user/view-user');
  }
}
