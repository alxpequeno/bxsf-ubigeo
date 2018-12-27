import { Injectable } from '@angular/core';
import { Region } from '../interfaces/region.interface';
import { Province } from '../interfaces/province.inteface';
import { District } from '../interfaces/district.interface';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  file: any;
  regions: Region[] = [];
  provinces: Province[] = [];
  districts: District[] = [];

  constructor() { }

  loadUbigeo() {

    // capture the text between “ and ”
    var matches = this.file.match(/\“([^”]+)\”/g);

    // data : Region / Province / District
    for (let data of matches) {
      var objTxt = data.substring(1, data.length - 1);
      var obj = objTxt.split('/');

      var objRegion = obj[0].trim();
      var objProvince = obj[1].trim();
      var objDistrict = obj[2].trim();

      var codeRegion = objRegion.split(" ")[0].trim();
      var nameRegion = objRegion.split(" ")[1].trim();

      // If not exists add new Region
      var region = this.regions.find(x => x.code == codeRegion);

      if (!region) {
        var newRegion: Region = {
          code: codeRegion,
          name: nameRegion,
          provinces: []
        };

        this.regions.push(newRegion);
      }

      if (objProvince != "") {

        // Gets the code and name separated with the first space
        var codeProvince = objProvince.substr(0, objProvince.indexOf(' '));
        var nameProvince = objProvince.substr(objProvince.indexOf(' ') + 1);

        var province = region.provinces.find(z => z.code == codeProvince);

        if (!province) {
          var newProvince: Province = {
            code: codeProvince,
            name: nameProvince,
            districts: []
          }

          region.provinces.push(newProvince);
        }

        if (objDistrict != "") {

          province = region.provinces.find(z => z.code == codeProvince);

          var codeDistrict = objDistrict.substr(0, objDistrict.indexOf(' '));
          var nameDistrict = objDistrict.substr(objDistrict.indexOf(' ') + 1);

          var district = province.districts.find(y => y.code == codeDistrict);

          if (!district) {
            var newDistrict: District = {
              code: codeDistrict,
              name: nameDistrict
            };

            province.districts.push(newDistrict);
          }

        }

      }
    }

    console.log(this.regions);

    // Saves all data in arrays
    for (let r of this.regions) {
      for (let p of r.provinces) {
        this.provinces.push(p);
        for (let d of p.districts) {
          this.districts.push(d);
        }
      }
    }
  }
}
