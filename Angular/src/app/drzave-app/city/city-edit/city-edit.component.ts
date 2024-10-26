import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../shared/services/http/country.service';
import { CityService } from '../../shared/services/http/city.service';
import { ToastrService } from 'ngx-toastr';
import { City } from "../../shared/models/city.model";
import { LoginService } from 'src/app/login/login-service/login.service';
import { environment } from 'src/environments/environment';
import { DisableButtonService } from 'src/app/disable-button-service/disable-button.service';

@Component({
  selector: 'app-city-edit',
  templateUrl: './city-edit.component.html',
  styles: []
})
export class CityEditComponent implements OnInit {

  private id: number;
  private cityForEdit: FormGroup = this.formBuilder.group({
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl('', Validators.required),
    population: new FormControl(),
    countryId: new FormControl()
  });
  private cityName: string;
  private listOfCountries: Country[] = [];
  private countryName: string = '';


  constructor(private route: ActivatedRoute, private countryService: CountryService,
    private cityService: CityService, private formBuilder: FormBuilder, private toastr: ToastrService,
    private loginService: LoginService, private router: Router, private btnService: DisableButtonService) { }

  ngOnInit() {
    this.loginService.isTokenExpired();
    this.btnService.setButtonDisabler(false);
    this.getCityIdFromRoute();
    this.getCityFromId();
    this.getCountriesToList();
  }


  getCityIdFromRoute() {
    this.id = + this.route.snapshot.paramMap.get('id');
  }

  getCityFromId() {
    this.cityService.getOne(this.id)
      .subscribe((city: City) => {
        this.cityForEdit = this.formBuilder.group({
          id: [city.id],
          name: [city.name, Validators.required],
          population: [city.population],
          countryId: [city.countryId]
        }),
          this.cityName = city.name;
      },
        err => {
          console.log(`ERROR fetching city (Id: ${this.id}) from database: `, err);
          this.router.navigate([`/${environment.errorRoute}`])
        });
  }

  updateCity(form: FormGroup) {
    console.log(form.value);
    this.btnService.setButtonDisabler(true);
    this.cityService.put(form.value).subscribe(
      res => {
        console.log("CITY SUCCESSFULLY CHANGED");
        form.markAsPristine();
        this.toastr.success('City successfully changed!');
        this.btnService.setButtonDisabler(false);
      },
      err => {
        console.log("ERROR changing the city!", err);
        console.log(form.value);
        this.toastr.error('ERROR changing the city!');
        this.btnService.setButtonDisabler(false);
      }
    );
  }

  getCountriesToList() {
    this.countryService.getAll().subscribe(
      (countries: Country[]) => {
        countries.forEach((country: Country) => {
          this.listOfCountries.push({
            id: country.id,
            name: country.name
          });
        })
      },
      err => {
        console.log("ERROR fetching list of countries from database: ", err);
      });
  }

  anullCity() {
    this.cityForEdit = this.formBuilder.group({
      id: this.cityForEdit.value.id,
      name: new FormControl('', Validators.required),
      population: new FormControl(),
      countryId: new FormControl()
    });
  }
}
