import {Component, Inject} from "@angular/core";
import {EstimateDataService, Data_tab} from "../data.service";
import {FormBuilder} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from '@angular/material/snack-bar';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
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

  res: any;
  dataTab: Data_tab[] = []
  dataSource: any;
  displayedColumns: string[] = ['name', 'array', 'name_array', 'text', 'value'];

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
        console.log('Get Variable for this category with success')
        this.res = res;
        console.log(res)
      })
      .catch(err => {
        console.log('Not get Variable for this category error : ' + err);
        console.log(this.priceEstimId)
      });
  }

  // Load data for tab
  async loadData() {
    // Call data with api
    await this.getInputFuncData();

    // Sort and treatment data
    for await (let data of this.res){
      let name_array = '----'

      if(!data.val_func_id.array){
        data.val_func_id.array = 'Non';
      }else{
        data.val_func_id.array = 'Oui';
        name_array = data.val_func_array_id.name
      }

      if(data.val_func_id.text){
        data.val_func_id.text = 'Oui';
      }else{
        data.val_func_id.text = 'Non';
      }

      this.dataTab.push({name: data.val_func_id.name, name_array: name_array, array: data.val_func_id.array, text: data.val_func_id.text, value: data.value});
    }

    // Create Tab
    this.dataSource = new MatTableDataSource<Data_tab>(this.dataTab);

  }


}




