import { Component, OnInit } from '@angular/core';
import {MtxGridColumn} from "@ng-matero/extensions/grid";
import {TranslateService} from "@ngx-translate/core";
import {UserDataService} from "../data.service";
import {MtxDialog} from "@ng-matero/extensions/dialog";

@Component({
  selector: 'app-user-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
  providers: [UserDataService]
})
export class UserViewUserComponent implements OnInit {

  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('view_user.id'),
      field: '_id',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_user.username'),
      field: 'username',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_user.password'),
      field: 'password',
      minWidth: 100,
    },
    {
      header: this.translate.stream('view_user.operation'),
      field: 'operation',
      minWidth: 120,
      width: '120px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('view_user.delete'),
          tooltip: this.translate.stream('view_user.delete'),
          pop: true,
          popTitle: this.translate.stream('view_user.confirm_delete'),
          popCloseText: this.translate.stream('view_user.close'),
          popOkText: this.translate.stream('view_user.ok'),
          click: record => this.delete(record),
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

  constructor(private translate: TranslateService, private dataSrv: UserDataService, public dialog: MtxDialog) { }

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
          this.dialog.alert(`Vous avez supprimé ${value.username}!`);
        },
        error: error => {
          this.dialog.alert(`La suppression de ${value.username} a échoué ! Erreur:` + error);
        }
      });
    this.loadData();
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

}

