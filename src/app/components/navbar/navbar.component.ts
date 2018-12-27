import { Component, OnInit } from '@angular/core';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _ubigeoService: UbigeoService) { }

  ngOnInit() {
  }

  uploadFile(event: any) {
    var fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0]);

    fileReader.onload = () => {
      this._ubigeoService.file = fileReader.result;
    }
  }

  showUbigeo() {
    this._ubigeoService.loadUbigeo();
  }


}
