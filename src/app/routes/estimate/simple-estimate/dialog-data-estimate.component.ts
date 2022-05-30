import {Component, ContentChild, Inject} from "@angular/core";
import {EstimateDataService, Input} from "../data.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {MtxDialog} from "@ng-matero/extensions/dialog";
import {MatSnackBar} from '@angular/material/snack-bar';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'dialog-see-data',
  styles: [
    `
      .demo-full-width {
        width: 100%;
      }

      table {
        width: 100%;
      }
    `,
  ],
  templateUrl: 'dialog-data-estimate.component.html',
  providers: [EstimateDataService]
})
export class DialogSeeDataComponent implements AfterViewInit {


  priceEstimName = this.data.name;
  priceEstimId = this.data.id

  dataSource: any;
  displayedColumns: string[] = ['name', 'text', 'array', 'value'];

  //TODO: Sort not working for string
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar, private dataSrv: EstimateDataService, private _formbuilder: FormBuilder, private translate: TranslateService) {
  }

  async ngAfterViewInit(){
    await this.loadData()


    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }

  async getInputFuncData() {
    await this.dataSrv.getInputFuncDataWithPriceEstimId(this.priceEstimId)
      .toPromise()
      .then(res => {
        this.dataSource = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('Get Variable for this category with success')
        this.dataSource = new MatTableDataSource<Input>(res);
        console.log(res)
      })
      .catch(err => {
        console.log('Not get Variable for this category error : ' + err);
        console.log(this.priceEstimId)
      });
  }

  async loadData() {
    await this.getInputFuncData();
    console.log(this.dataSource)
  }


}




