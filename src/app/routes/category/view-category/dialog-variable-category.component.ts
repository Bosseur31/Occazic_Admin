import {Component, Inject} from "@angular/core";
import {CategoryDataService, Val, Val_Array} from "../data.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {MtxDialog} from "@ng-matero/extensions/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {DialogEditSelectComponent} from "./dialog-edit-select.component";
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'dialog-edit-variable',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }

      .var_form {
        display: flex;
        align-items: baseline;
      }

      .var_total {
        margin-top: 1.34375em;
        margin-left: auto;
        margin-right: auto;
      }

      .icon_add {
        margin-left: 3%;
        color: green;
      }

      .icon_del {
        font-size: 50px;
        margin-left: 5%;
      }

      .icon_edit {
        font-size: 50px;
        margin-left: 5%;
      }

      .var_input {
        width: 100%;
      }

      .var_select {
        width: 100%;
        margin-left: 5%;
      }

    `,
  ],
  templateUrl: 'dialog-variable-category.component.html',
  providers: [CategoryDataService]
})
export class DialogEditVariableComponent {

  // @ts-ignore
  EditForm: FormGroup;

  valFunc: Val[] | undefined = [];
  valFuncArray: Val_Array[] | undefined = [];
  PutCat: any;

  catName = this.data.name;
  catId = this.data.id

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private scroller: ViewportScroller, private dataSrv: CategoryDataService, private _formbuilder: FormBuilder, private translate: TranslateService, public dialog: MtxDialog, public dialog1: MatDialog) {
  }

  async ngOnInit() {

    this.EditForm = this._formbuilder.group({
      variables: this._formbuilder.array([])
    });

    await this.loadData()

  }

  async getValFuncData() {
    await this.dataSrv.getValFuncDataWithCat(this.catId)
      .toPromise()
      .then(data => {
        this.valFunc = data;
        console.log('Get Variable for this category with success')
      })
      .catch(err => {
        console.log('Not get Variable for this category error : ' + err);
      });
  }

  // TODO: Optimize a Val Func Array call, for call uniquely a val array for one input
  async getAllValFuncArrayData() {
    await this.dataSrv.getAllValFuncArrayData()
      .toPromise()
      .then(data => {
        this.valFuncArray = data;
        console.log('Get all Variable Array with success')
      })
      .catch(err => {
        console.log('Not get all Variable Array error : ' + err);
      });
  }

  // Load all data
  async loadData() {
    let valFuncId = [];
    await this.getValFuncData();
    await this.getAllValFuncArrayData();

    // If forms is empty
    if (this.EditForm.value.variables.length === 0){
      // @ts-ignore
      for (let valFuncApi of this.valFunc){
        this.variable.push(this.newVariable(valFuncApi.name, valFuncApi.array, valFuncApi.text, valFuncApi._id))
      }
    }
    // If forms is not empty, add variable not present and patch to modify variable
    else{
      for (let valFuncForm of this.EditForm.value.variables) {
        // @ts-ignore
        for (let valFuncApi of this.valFunc){
          if(valFuncForm.id === valFuncApi._id){
            valFuncId.push(valFuncForm.id)
            if(valFuncForm.name !== valFuncApi.name){
              let index = this.EditForm.value.variables.indexOf(valFuncForm)
              this.variable.at(index).patchValue({ name: valFuncApi.name })
            }
          }
        }
      }
      // @ts-ignore
      for(let valFuncApi of this.valFunc){
        if(!valFuncId.includes(valFuncApi._id)){
          this.variable.push(this.newVariable(valFuncApi.name, valFuncApi.array, valFuncApi.text, valFuncApi._id))
        }
      }
    }
  }


  // Recovery forms with all var
  get variable(): FormArray {
    return this.EditForm.get('variables') as FormArray;
  }

  // Define setting of input.
  newVariable(name: string, array: boolean, text: boolean, id: string): FormGroup {
    return this._formbuilder.group({
      name: [name, Validators.required],
      array: array,
      text: text,
      id: id
    });
  }

  // Delete var in forms
  removeVariable(Index: number) {
    this.variable.removeAt(Index);
  }

  // Delete input
  delVal(index: number) {
    let valId = this.EditForm.value.variables[index].id
    let valName = this.EditForm.value.variables[index].name

    if (valId != 'new') {
      this.dataSrv.delVal(valId)
        .subscribe({
          next: data => {
            console.log('Variable delete with success');
          },
          error: error => {
            this.dialog.alert(`Variable not delete Error:` + error);
          }
        });
      this.dataSrv.delValArrayWithValId(valId).subscribe({
        next: data => {
          console.log('Array value delete with success');
        },
        error: error => {
          this.dialog.alert(`Array value not delete Error:` + error);
        }
      });
    }

    this.removeVariable(index);

    this.snackBar.open(`Variable ${valName} supprimé !`, '', {duration: 3000});
  }

  editSelect(id: string, name: string, index: number) {

    let dialogRef = this.dialog1.open(DialogEditSelectComponent,
      {
        width: '35%',
        data: {id: id, catId: this.catId, name: name}
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      // Delete ancient select
      if(id == 'new'){
        this.removeVariable(index)
      }
      // Load all data
      this.loadData();
    });

  }

  // Add new input, setting define type of input
  addVal(array: boolean, text: boolean) {
    this.variable.push(this.newVariable('', array, text, 'new'))
  }

  onSubmit() {
    for (let valFunc of this.EditForm.value.variables) {
      // If Val Fun is new, create new val Func else modify Val Func
      if (valFunc.id === 'new' && valFunc.name !== '') {
        this.dataSrv.postVal(valFunc.name, valFunc.array, valFunc.text, this.catId).toPromise()
          .then(data => {
            console.log('Create new variable input with success');
          })
          .catch(err => {
            console.log('Not create variable input error : ' + err, valFunc, valFunc.name);
          });
      } else {
        this.dataSrv.putVal(valFunc.name, valFunc.id).toPromise()
          .then(data => {
            this.PutCat = data;
            console.log('Modify variable input with success');
          })
          .catch(err => {
            console.log('Not modify variable input error : ' + err);
          });
      }
    }
  }

  //TODO: Got to bottom modal when a new input or select is add

}
