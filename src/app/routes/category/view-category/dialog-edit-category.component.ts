import {Component, Inject} from "@angular/core";
import {CategoryDataService} from "../data.service";
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

  OneCat: any;
  PutCat: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _formbuilder: FormBuilder, private dataSrv: CategoryDataService,) { }

  async ngOnInit() {
    this.EditForm = this._formbuilder.group({
      name: '',
      function: '',
      marge: ''
    });
    await this.getOneData();
    let infos = {
      name: this.OneCat.name,
      function: this.OneCat.function,
      marge: this.OneCat.marge
    }
    this.EditForm.patchValue(infos)
  }

  async getOneData(){
    await this.dataSrv.getOneData(this.data.id)
      .toPromise()
      .then(data => this.OneCat = data )
      .catch(err => { console.log ('error : ' + err);});
  }

  async modifyCat(name: string, _function: string, marge: number) {
    await this.dataSrv.putCat(name, _function, marge, this.data.id)
      .toPromise()
      .then(data => this.PutCat = data )
      .catch(err => { console.log ('error : ' + err);});
  }


  onSubmit(){
    let name = this.EditForm.value.name;
    let _function = this.EditForm.value.function;
    let marge = this.EditForm.value.marge;
    this.modifyCat(name ,_function ,marge);

  }
}
