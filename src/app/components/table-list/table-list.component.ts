import { Component, OnInit } from '@angular/core';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { Region } from 'src/app/interfaces/region.interface';
import { Province } from 'src/app/interfaces/province.inteface';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  regions:Region[] = [];
  provinces:Province[]=[];

  constructor(private _ubigeoService:UbigeoService) { }

  ngOnInit() {
    this.regions = this._ubigeoService.regions;
    this.provinces = this._ubigeoService.provinces;
  }

}
