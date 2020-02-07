import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { CountryService } from "../shared/services/http/country.service";
import { CityService } from "../shared/services/http/city.service";
import { PopoverService } from '../shared/services/popover.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { City } from "./../shared/models/city.model";
import { LoginService } from 'src/app/login/login-service/login.service';




@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styles: []
})
export class CountryComponent implements OnInit {

  private listOfCountries: FormArray = this.formBuilder.array([]);
  private listOfCities: City[] = [];
  private newCountry: FormGroup;

  constructor(private countryService: CountryService, private cityService: CityService,
    private formBuilder: FormBuilder, private popover: PopoverService, private router: Router, 
    private toastr: ToastrService, private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.isTokenExpired();
    this.getCountriesToList();
    this.getCitiesToList();
    this.setInputToDefaultValues();
  }

  getCountriesToList() {
    this.countryService.getAll().subscribe(
      (countries: Country[]) => {
        countries.forEach((country: Country) => {
          this.listOfCountries.push(this.formBuilder.group({
            id: [country.id],
            name: [country.name, Validators.required]
          }));
        })
      },
      err => {
        console.log("Fetching list of countries from database: ", err);
      });
  }

  getCitiesToList() {
    this.cityService.getAll().subscribe(
      (cities: City[]) => {
        cities.forEach((city: City) => {
          this.listOfCities.push({
            id: city.id,
            name: city.name,
            population: city.population,
            countryId: city.countryId
          });
        })
      },
      err => {
        console.log("Fetching list of cities from database: ", err);
      });
  }

  setInputToDefaultValues() {
    this.newCountry = this.formBuilder.group({
      id: new FormControl(0),
      name: new FormControl('')
    });
  }

  pushFormGroupIntoArray(form: FormGroup) {
    console.log(form.value);
    this.listOfCountries.push(this.formBuilder.group({
      id: [form.value.id],
      name: [form.value.name]
    }));
  }

  insertCountry(form: FormGroup) {
    this.countryService.post(form.value).subscribe(
      (country: Country) => {
        form.patchValue({ id: country.id });
        console.log("COUNTRY SUCCESSFULLY POSTED!");
        this.pushFormGroupIntoArray(form);
        this.setInputToDefaultValues();
        this.toastr.success('Country successfully posted!');
      },
      err => {
        console.log("ERROR posting the country!", err);
        console.log(form.value);
        this.toastr.error('ERROR posting the country!');

      }
    );
  }

  onDelete(id: number, i: number) {
    this.countryService.delete(id).subscribe(
      (country: Country) => {
        this.listOfCountries.removeAt(i);
        console.log("COUNTRY DELETED", id);
        this.toastr.success('Country successfully deleted!');
      },
      err => {
        console.log(`ERROR deleting the country( ID: ${id} )`, err);
        this.toastr.error('ERROR deleting the country!');
      }
    );
  }

  editButtonClick(id: number){
    this.router.navigateByUrl(`${environment.countriesEditRoute}/${id}`);
  }
}
