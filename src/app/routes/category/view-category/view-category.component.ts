import { Component, OnInit } from '@angular/core';
import {MtxGridColumn} from "@ng-matero/extensions/grid";
import {TranslateService} from "@ngx-translate/core";
import {MtxDialog} from "@ng-matero/extensions/dialog";
import { MatDialog } from '@angular/material/dialog';
import {CategoryDataService} from "../data.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserDataService} from "../../user/data.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {DialogEditVariableComponent} from "./dialog-variable-category.component";
import {DialogEditFormComponent} from "./dialog-edit-category.component";

@Component({
  selector: 'app-category-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
  providers: [CategoryDataService]
})
export class CategoryViewCategoryComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('view_category.id'),
      field: '_id',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_category.name'),
      field: 'name',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_category.function'),
      field: 'function',
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_category.marge'),
      field: 'marge',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_category.picture'),
      field: 'picture',
      type: "image",
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_category.variable'),
      field: 'variable',
      type: "button",
      minWidth: 50,
      buttons: [
        {
          color: 'primary',
          icon: 'visibility',
          tooltip: this.translate.stream('view_category.see'),
          click: record => this.seeVar(record),
        },
      ],
    },
    {
      header: this.translate.stream('view_category.root_category'),
      field: 'sub_category.name',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_category.operation'),
      field: 'operation',
      minWidth: 120,
      width: '120px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('view_category.delete'),
          tooltip: this.translate.stream('view_category.delete'),
          pop: true,
          popTitle: this.translate.stream('view_category.confirm_delete'),
          popCloseText: this.translate.stream('view_category.close'),
          popOkText: this.translate.stream('view_category.ok'),
          click: record => this.delete(record),
        },
        {
          color: 'primary',
          icon: 'edit',
          tooltip: this.translate.stream('view_category.edit'),
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

  constructor( private translate: TranslateService, private dataSrv: CategoryDataService, public dialog: MtxDialog, public dialog1: MatDialog) {

  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.isLoading = true;
    this.dataSrv.getData()
      .subscribe((data)=>{
        this.list = data;
        console.log(this.list)
        this.isLoading = false;
      });
  }

   delete(value: any) {
    this.dataSrv.delData(value._id)
      .subscribe({
        next: data => {
          this.dialog.alert(`Vous avez supprimé ${value.name}!`);
        },
        error: error => {
          this.dialog.alert(`La suppression de ${value.name} a échoué ! Erreur:` + error);
        }
      });
    this.dataSrv.delValWithCatId(value._id)
      .subscribe({
        next: data => {
          this.dialog.alert(`Toute les valeurs de fonction de ${value.name}, ont été supprimé !`);
        },
        error: error => {
          this.dialog.alert(`La suppression des valeurs de fonction de ${value.name}, a échoué ! Erreur:` + error);
        }
      });
    this.loadData();
  }

  edit(value: any){
    let dialogRef = this.dialog1.open(DialogEditFormComponent,
      {data: { id: value._id, name: value.name }}
      );
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  seeVar(value: any){
    let dialogRef = this.dialog1.open(DialogEditVariableComponent,
      {
        width: '25%',
        data: { id: value._id, name: value.name }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });

  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

}


