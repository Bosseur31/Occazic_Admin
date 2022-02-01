import {Component, Inject} from "@angular/core";
import {CategoryDataService} from "../data.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'dialog-edit-sub-category',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }
    `,
  ],
  templateUrl: 'dialog-edit-sub-category.component.html',
  providers: [CategoryDataService]
})
export class DialogEditSubCatComponent {

  // @ts-ignore
  EditForm: FormGroup;

  oneSubCat: any;

  subCatName = this.data.name;
  subCatId = this.data.id;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _formbuilder: FormBuilder, private dataSrv: CategoryDataService,) { }

  async ngOnInit() {
    this.EditForm = this._formbuilder.group({
      name: ''
    });
    await this.getOneData();
    let infos = {
      name: this.oneSubCat.name,
    }
    this.EditForm.patchValue(infos)
  }

  async getOneData(){
    await this.dataSrv.getSubCatOneData(this.subCatId)
      .toPromise()
      .then(data => {this.oneSubCat = data; console.log('Get data for this sub-category with success !')} )
      .catch(err => { console.log ('Not get data for this sub-category error : ' + err);});
  }

  async modifySubCat(name: string) {
    await this.dataSrv.putSubCat(name, this.subCatId)
      .toPromise()
      .then(data => { console.log('Modify sub-category with success !') })
      .catch(err => { console.log ('Not modify sub-category error : ' + err);});
  }


  onSubmit(){
    let name = this.EditForm.value.name;
    this.modifySubCat(name);
  }
}
