import {Component, Inject} from "@angular/core";
import {CategoryDataService, Sub_Cat} from "../data.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'dialog-edit-form',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: 'dialog-edit-category.component.html',
  providers: [CategoryDataService]
})
export class DialogEditFormComponent {

  // @ts-ignore
  EditForm: FormGroup;

  rootCatLists: Sub_Cat[] | undefined = [];

  OneCat: any;
  PutCat: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _formbuilder: FormBuilder, private dataSrv: CategoryDataService,) { }

  async ngOnInit() {
    this.EditForm = this._formbuilder.group({
      name: '',
      function: '',
      marge: '',
      root_category: ''
    });
    await this.getOneData();
    let infos = {
      name: this.OneCat.name,
      function: this.OneCat.function,
      marge: this.OneCat.marge,
      root_category: this.OneCat.sub_category._id
    }
    this.EditForm.patchValue(infos)
  }

  async getOneData(){
    await this.dataSrv.getOneData(this.data.id)
      .toPromise()
      .then(data => this.OneCat = data )
      .catch(err => { console.log ('error : ' + err);});

    await this.dataSrv.getSubCatData()
      .toPromise()
      .then(data => {this.rootCatLists = data; console.log('Get Root Category with success')})
      .catch(err => {console.log('Not get Root Category error : ' + err);});
  }

  async modifyCat(name: string, _function: string, marge: number, root_cat: string) {
    await this.dataSrv.putCat(name, _function, marge, root_cat, this.data.id)
      .toPromise()
      .then(data => {this.PutCat = data; console.log('Modify category with success')} )
      .catch(err => { console.log ('Not modify category error : ' + err);});
  }


  onSubmit(){
    let name = this.EditForm.value.name;
    let _function = this.EditForm.value.function;
    let marge = this.EditForm.value.marge;
    let root_cat = this.EditForm.value.root_category
    this.modifyCat(name, _function, marge, root_cat);

  }
}
