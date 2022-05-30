import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { EstimateDataService } from '../data.service';
import { TranslateService } from '@ngx-translate/core';
import {DialogSeeDataComponent} from "./dialog-data-estimate.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-estimate-simple-estimate',
  templateUrl: './simple-estimate.component.html',
  styleUrls: ['./simple-estimate.component.scss'],
  providers: [EstimateDataService]
})
export class EstimateSimpleEstimateComponent implements OnInit {
  columns: MtxGridColumn[] = [
    {
      header: this.translate.stream('simple_estimate.id'),
      field: '_id',
      sortable: true,
      disabled: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('simple_estimate.name'),
      field: 'name',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('simple_estimate.surname'),
      field: 'surname',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('simple_estimate.mail'),
      field: 'mail',
      sortable: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('simple_estimate.mobile'),
      field: 'mobile',
      hide: true,
      minWidth: 100,
    },
    {
      header: this.translate.stream('simple_estimate.name_category'),
      field: 'product_category_id.name',
      sortable: true,
      minWidth: 120,
    },
    {
      header: this.translate.stream('simple_estimate.data_user'),
      field: 'data_user',
      type: "button",
      minWidth: 50,
      buttons: [
        {
          color: 'primary',
          icon: 'visibility',
          tooltip: this.translate.stream('simple_estimate.see'),
          click: record => this.seeVar(record),
        },
      ],
    },
    {
      header: this.translate.stream('simple_estimate.function'),
      field: 'product_category_id.function',
      minWidth: 120,
    },
    {
      header: this.translate.stream('simple_estimate.marge'),
      field: 'product_category_id.marge',
      minWidth: 120,
    },
    {
      header: this.translate.stream('simple_estimate.price'),
      field: 'calcul_id.propose_price',
      minWidth: 180,
    },
    {
      header: this.translate.stream('simple_estimate.operation'),
      field: 'operation',
      minWidth: 120,
      width: '120px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          color: 'warn',
          icon: 'delete',
          text: this.translate.stream('simple_estimate.delete'),
          tooltip: this.translate.stream('simple_estimate.delete'),
          pop: true,
          popTitle: this.translate.stream('simple_estimate.confirm_delete'),
          popCloseText: this.translate.stream('simple_estimate.close'),
          popOkText: this.translate.stream('simple_estimate.ok'),
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

  constructor(private translate: TranslateService, private dataSrv: EstimateDataService, public dialog: MtxDialog, public dialog1: MatDialog) {

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

    try {
      this.dataSrv.delData(value._id)
        .subscribe({
          next: data => {
            this.dialog.alert(`Vous avez supprimé ${value._id}!`);
          },
          error: error => {
            this.dialog.alert(`La suppression de ${value._id} a échoué ! Erreur:` + error);
          }
        });
    } catch {
      console.log('Data eimate not Found')
    }

    try {
      this.dataSrv.delCalcul(value.calcul_id._id)
        .subscribe({
          next: data => {
            this.dialog.alert(`Tout les calculs de ${value._id}, ont été supprimé !`);
          },
          error: error => {
            this.dialog.alert(`La suppression des calculs de ${value._id}, a échoué ! Erreur:` + error);
          }
        });
    } catch {
      console.log('Data calcul not Found')
    }

    try {
      this.dataSrv.delInput(value._id)
        .subscribe({
          next: data => {
            this.dialog.alert(`Toute les valeurs enregistrées de ${value._id}, ont été supprimé !`);
          },
          error: error => {
            this.dialog.alert(`La suppression des valeurs enregistrées de ${value._id}, a échoué ! Erreur:` + error);
          }
        });
    } catch {
      console.log('Data Input not Found')
    }

    this.loadData();
  }

  // Modal with data entry by user
  seeVar(value: any){
    let dialogRef = this.dialog1.open(DialogSeeDataComponent,
      {
        width: '50%',
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
