import {Component, OnInit} from '@angular/core';
import {MtxGridColumn} from "@ng-matero/extensions/grid";
import {TranslateService} from "@ngx-translate/core";
import {MtxDialog} from "@ng-matero/extensions/dialog";
import {CategoryDataService, Sub_Cat} from "../data.service";
import {DialogEditSubCatComponent} from "./dialog-edit-sub-category.component";
import {MatDialog} from "@angular/material/dialog";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
  providers: [CategoryDataService]
})
export class CategorySubCategoryComponent implements OnInit {

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('view_root_category.id'),
      field: '_id',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_root_category.name'),
      field: 'name',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_root_category.picture'),
      field: 'picture',
      type: "image",
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_root_category.operation'),
      field: 'operation',
      minWidth: 120,
      width: '120px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('view_root_category.delete'),
          tooltip: this.translate.stream('view_root_category.delete'),
          pop: true,
          popTitle: this.translate.stream('view_root_category.confirm_delete'),
          popCloseText: this.translate.stream('view_root_category.close'),
          popOkText: this.translate.stream('view_root_category.ok'),
          click: record => this.delete(record),
        },
        {
          color: 'primary',
          icon: 'edit',
          tooltip: this.translate.stream('view_root_category.edit'),
          click: record => this.edit(record),
        },
      ],
    },
  ];
  list: any[] = [];

  isLoading = true;
  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnMovable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;

  // @ts-ignore
  EditForm: FormGroup;

  rootCatLists: Sub_Cat[] | undefined = [];

  constructor(private _formbuilder: FormBuilder, private translate: TranslateService, private dataSrv: CategoryDataService, public dialog: MtxDialog, public dialog1: MatDialog, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.EditForm = this._formbuilder.group({
      name: ['', [Validators.required]],
      file: ['', [Validators.required]]
    });
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.dataSrv.getSubCatData()
      .subscribe((data) => {
        this.list = data;
        console.log('Root categories data get with success')
        this.isLoading = false;
      });
  }

  delete(value: any) {
    this.dataSrv.delSubCatData(value._id)
      .subscribe({
        next: data => {
          this.dialog.alert(`Vous avez supprimé ${value.name}!`);
        },
        error: error => {
          this.dialog.alert(`La suppression de ${value.name} a échoué ! Erreur:` + error);
        }
      });
    this.loadData();
  }

  edit(value: any) {
    let dialogRef = this.dialog1.open(DialogEditSubCatComponent,
      {data: {id: value._id, name: value.name}}
    );
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  async createRootCat(formData: any) {
    await this.dataSrv.postRootCat(formData)
      .toPromise()
      .then(data => {
        this.rootCatLists = data;
        console.log('Create Root Category with success');
        this.snackBar.open('La Catégorie Racine a bien été crée !', '', {duration: 4000});
      })
      .catch(err => {
        console.log('Not create Root Category error : ' + err);
      });
    await this.loadData();
    await this.EditForm.reset();
  }

  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // @ts-ignore
      this.EditForm.patchValue({
        file
      });
    }
  }

  async onSubmit() {
    const formData = new FormData();
    formData.append('image', this.EditForm.value.file);
    formData.append('name', this.EditForm.value.name);
    await this.createRootCat(formData);
  }

}
