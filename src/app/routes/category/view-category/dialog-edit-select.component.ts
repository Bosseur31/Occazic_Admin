import {Component, Inject} from "@angular/core";
import {CategoryDataService, Val_Array} from "../data.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'dialog-edit-select',
  styles: [
    `
      .select_form {
        display: flex;
        align-items: baseline;
        justify-content: center;
        margin-left: 30%;
      }

      .select_total{
        margin-top: 1.34375em;

      }

      .icon_add {
        margin-left: 3%;
        color: green;
      }

      .icon_del {
        font-size: 50px;
        margin-left: 5%;
      }

      .sel_input {
        width: 100%;
        margin-left: 8%;
      }

      .sel_input_name{
        width: 90%;
        margin-left: 5%;
        margin-top: 1.34375em;
      }
    `,
  ],
  templateUrl: 'dialog-edit-select.component.html',
  providers: [CategoryDataService]
})
export class DialogEditSelectComponent {

  // @ts-ignore
  EditForm: FormGroup;
  selectName = this.data.name;
  selectId = this.data.id;
  catId = this.data.catId;

  valFunc: any;
  valFuncArray: Val_Array[] | undefined = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private _formbuilder: FormBuilder, private dataSrv: CategoryDataService,) { }

  async ngOnInit() {
    this.EditForm = this._formbuilder.group({
      name: this.selectName,
      options: this._formbuilder.array([])
    });

    if(this.selectId != 'new'){
      await this.getValFuncArrayData();
    }

    // @ts-ignore
    for(let option of this.valFuncArray){
      this.option.push(this.newOption(option.name, option.value, option._id))
    }

  }

  get option(): FormArray {
    return this.EditForm.get('options') as FormArray;
  }

  newOption(name: string, value: number, id: string): FormGroup {
    return this._formbuilder.group({
      name: name,
      value: value,
      id: id
    });
  }

  removeOption(Index: number) {
    this.option.removeAt(Index);
  }

  async getValFuncArrayData(){
    await this.dataSrv.getValFuncArrayDataWithVal(this.selectId)
      .toPromise()
      .then(data => {this.valFuncArray = data; console.log('Get option with success !')} )
      .catch(err => { console.log ('error : ' + err);});
  }

  addOption(){
    this.option.push(this.newOption('', 0, 'new'))
  }

  delOpt(index: number) {
    let optId = this.EditForm.value.options[index].id
    let optName = this.EditForm.value.options[index].name
    let optValue = this.EditForm.value.options[index].value
    if (optId != 'new') {
      this.dataSrv.delValArray(optId).subscribe({
        next: data => {
          console.log('Array value delete with success');
        },
        error: error => {
          console.log('Array value delete with success');
        }
      });
    }
    this.removeOption(index);
    this.snackBar.open(`Option ${optName} supprimé !`, '', { duration: 3000 });
  }

  async onSubmit(){

    if(this.selectId == 'new'){
      await this.dataSrv.postVal(this.EditForm.value.name, true, this.catId).toPromise()
        .then(data => { console.log('Create select with success'); this.valFunc = data; })
        .catch(err => { console.log ('error : ' + err);});
      this.selectId = this.valFunc._id
    }
    else{
      await this.dataSrv.putVal(this.EditForm.value.name, this.selectId).toPromise()
        .then(data => { console.log('Modify name of select with success'); })
        .catch(err => { console.log ('error : ' + err);});
    }


    for(let option of this.EditForm.value.options){
      if(option.id === 'new') {
        await this.dataSrv.postValFuncArray(option.name, option.value, this.selectId).toPromise()
          .then(data => {
            console.log('Create new option for select with success');
          })
          .catch(err => {
            console.log('error : ' + err);
          });
      }
      else{
        await this.dataSrv.putValFuncArray(option.name, option.value, option.id).toPromise()
          .then(data => { this.valFuncArray = data; console.log('Modify option with success'); })
          .catch(err => { console.log ('error : ' + err);});
      }
    }

    this.snackBar.open(`Le Select ${this.selectName} a etais modifié avec succès !`, '', { duration: 3000 });

  }
}
