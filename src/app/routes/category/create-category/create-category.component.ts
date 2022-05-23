import {Component, OnInit} from '@angular/core';
import {Form, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldControl} from '@angular/material/form-field';
import {CategoryDataService, Sub_Cat} from "../data.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-category-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
  providers: [CategoryDataService]
})

export class CategoryCreateCategoryComponent implements OnInit {

  // @ts-ignore
  CatForm: FormGroup;

  catLists: any;
  valLists: any;

  rootCatLists: Sub_Cat[] | undefined = [];

  // @ts-ignore
  catId: string;
  // @ts-ignore
  valId: string;

  // @ts-ignore
  url: string;

  constructor(private _formbuilder: FormBuilder, private dataSrv: CategoryDataService, private route: Router) {
  }


  ngOnInit() {
    this.CatForm = this._formbuilder.group({
      categories: this._formbuilder.array([])
    });
    this.addCategory();
    this.rootCatData();

  }

  rootCatData(){
    this.dataSrv.getSubCatData()
      .toPromise()
      .then(data => {
        this.rootCatLists = data;
        console.log('Get Root Category with success')
      })
      .catch(err => {
        console.log('Not get Root Category error : ' + err);
      });
  }

  onSelectFile(event: any, catIndex: number) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file)
      // @ts-ignore
      this.categoryFile(catIndex).patchValue({
        file
      });
    }
  }

  newCategory(): FormGroup {
    return this._formbuilder.group({
      name: '',
      function: '',
      marge: '',
      file: '',
      root_category: '',
      inputs: this._formbuilder.array([])
    });
  }

  newInput(): FormGroup {
    return this._formbuilder.group({
      name: '',
      array: false,
      text: false,
      array_values: this._formbuilder.array([])
    });
  }

  newSelect(): FormGroup {
    return this._formbuilder.group({
      name: '',
      value: ''
    });
  }

  get category(): FormArray {
    return this.CatForm.get('categories') as FormArray;
  }

  categoryFile(catIndex: number) {
    return this.category
      .at(catIndex)
      .get('file');
  }

  categoryInput(catIndex: number): FormArray {
    return this.category
      .at(catIndex)
      .get('inputs') as FormArray;
  }

  inputSelect(catIndex: number, inputIndex: number): FormArray {
    return this.categoryInput(catIndex)
      .at(inputIndex)
      .get('array_values') as FormArray;
  }

  inputArray(catIndex: number, inputIndex: number) {
    return this.categoryInput(catIndex)
      .at(inputIndex)
      .get('array');
  }

  addCategory() {
    this.category.push(this.newCategory());
  }

  addCategoryInput(catIndex: number) {
    this.categoryInput(catIndex).push(this.newInput());
  }

  addInputSelect(catIndex: number, inputIndex: number) {
    this.inputSelect(catIndex, inputIndex).push(this.newSelect());
  }

  removeCategory(catIndex: number) {
    this.category.removeAt(catIndex);
  }

  removeCategoryInput(catIndex: number, inputIndex: number) {
    this.categoryInput(catIndex).removeAt(inputIndex);
  }

  removeInputSelect(catIndex: number, inputIndex: number, selectIndex: number) {
    this.inputSelect(catIndex, inputIndex).removeAt(selectIndex);
  }

  async onSubmit() {
    for (let cat_value of this.CatForm.value.categories) {
      const formData = new FormData();
      formData.append('name', cat_value.name);
      formData.append('function', cat_value.function);
      formData.append('marge', cat_value.marge);
      //TODO: Understand why the file object is in an other object (cat_value.file / cat_value.file.file).
      formData.append('image', cat_value.file.file);
      formData.append('sub_category', cat_value.root_category);
      await this.createCat(formData);
      console.log('Catégorie Id apres fonction :')
      console.log(this.catId)
      for (let val_value of cat_value.inputs) {
        await this.createVal(val_value.name, val_value.array, val_value.text, this.catId);
        console.log('Valeur Id apres fonction:')
        console.log(this.valId)
        for (let sel_value of val_value.array_values) {
          await this.createSelect(sel_value.name, sel_value.value, this.valId);
          console.log('Apres Select :')
        }
      }
    }
    await this.route.navigateByUrl('/category/view-category');
  }

  async createCat(formData: any) {
    const data = await this.dataSrv.postCat(formData).toPromise();

    console.log('Création catégorie :')
    console.log(data)
    this.catLists = data;
    this.catId = this.catLists._id;
    console.log('Fin de la fonction Cat')
  }

  async createVal(name: string, array: boolean, text: boolean, catId: string) {
    const data = await this.dataSrv.postVal(name, array, text, catId).toPromise();
    console.log('Création Valeur Fonction :')
    console.log(data)
    this.valLists = data;
    this.valId = this.valLists._id;

    console.log('Fin de la fonction Val')
  }

  async createSelect(name: string, value: number, valId: string) {
    const data = await this.dataSrv.postValFuncArray(name, value, valId).toPromise()
    console.log('Création Valeur Select :')
    console.log(data)

    console.log('Fin de la fonction Sel')
  }

}
