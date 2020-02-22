import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup, FormControl } from '@angular/forms';
import { CountryService } from "../shared/services/http/country.service";
import { CityService } from "../shared/services/http/city.service";
import { PopoverService } from '../shared/services/popover.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { City } from "../shared/models/city.model";
import { of, Observable } from 'rxjs';
import { LoginService } from 'src/app/login/login-service/login.service';
import { DisableButtonService } from 'src/app/disable-button-service/disable-button.service';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styles: []
})
export class CityComponent implements OnInit {

  private listOfCities: FormArray = this.formBuilder.array([]);
  private listOfCountries: Country[] = [];
  private newCity: FormGroup;
  private countryName: string;

  constructor(private cityService: CityService, private countryService: CountryService,
    private formBuilder: FormBuilder, private popover: PopoverService, private router: Router,
    private toastr: ToastrService, private loginService: LoginService, private btnService: DisableButtonService) {
  }

  ngOnInit() {
    this.loginService.isTokenExpired();
    this.btnService.setButtonDisabler(false);
    this.getCountriesToList();
    this.setInputToDefaultValues();
  }

  getCitiesToList() {
    this.cityService.getAll().subscribe(
      res => {
        (res as City[]).forEach((city: City) => {
          this.listOfCities.push(this.formBuilder.group({
            id: [city.id],
            name: [city.name, Validators.required],
            population: [city.population],
            countryId: [city.countryId],
            countryName: [this.findCountryName(city.countryId)]
          }));
        })
      },
      err => {
        console.log("ERROR fetching list of cities from database: ", err);
      });
  }

  findCountryName(id: number): Observable<string> {
    const FOUND = this.listOfCountries.find(res =>
      res.id == id)
    if (FOUND == null) {
      return of('');
    }
    return of(FOUND.name);
  }

  getCountriesToList() {
    this.countryService.getAll().subscribe(
      (res: Country[]) => {
        res.forEach((country: Country) => {
          this.listOfCountries.push({
            id: country.id,
            name: country.name
          });
        });
        this.getCitiesToList();
      },
      err => {
        console.log("ERROR fetching list of countries from database: ", err);
      });
  }


  pushFormGroupIntoArray(form: FormGroup) {
    console.log(form.value);
    this.listOfCities.push(this.formBuilder.group({
      id: [form.value.id],
      name: [form.value.name],
      population: [form.value.population],
      countryId: [form.value.countryId],
      countryName: [this.findCountryName(form.value.countryId)]
    }));
  }

  insertCity(form: FormGroup) {
    this.btnService.setButtonDisabler(true);
    this.cityService.post(form.value).subscribe(
      (res: City) => {
        form.patchValue({ id: res.id });
        console.log("CITY successfully posted!");
        this.pushFormGroupIntoArray(form);
        this.setInputToDefaultValues();
        this.toastr.success('City successfully posted!');
        this.btnService.setButtonDisabler(false);
      },
      err => {
        console.log("ERROR posting the city!", err);
        console.log(form.value);
        this.toastr.error('ERROR posting the city!');
        this.btnService.setButtonDisabler(false);
      }
    );
  }

  onDelete(id: number, i: number) {
    this.cityService.delete(id).subscribe(
      (res: City) => {
        this.listOfCities.removeAt(i);
        console.log("CITY DELETED", id);
        this.toastr.success('City successfully deleted!');
      },
      err => {
        console.log(`ERROR deleting city ( ID: ${id} )`, err);
        this.toastr.error('ERROR deleting city!');
      }
    );
  }

  setInputToDefaultValues() {
    this.newCity = this.formBuilder.group({
      id: new FormControl(0),
      name: new FormControl(''),
      population: new FormControl(),
      countryId: new FormControl(),
      countryName: new FormControl()
    });
  }

  editButtonClick(id: number) {
    this.router.navigateByUrl(`${environment.citiesEditRoute}/${id}`);
  }

}
