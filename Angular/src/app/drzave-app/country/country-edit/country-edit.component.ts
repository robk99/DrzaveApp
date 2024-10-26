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
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styles: []
})
export class CountryEditComponent implements OnInit {
  private id: number;
  private countryForEdit: FormGroup = this.formBuilder.group({
    id: new FormControl({ value: 0, disabled: true }),
    name: new FormControl('', Validators.required)
  });
  private countryName: string;
  private listOfCities: City[] = [];

  constructor(private route: ActivatedRoute, private countryService: CountryService,
    private cityService: CityService, private formBuilder: FormBuilder, private toastr: ToastrService,
    private loginService: LoginService, private router: Router, private btnService: DisableButtonService) { }

  ngOnInit() {
    this.loginService.isTokenExpired();
    this.btnService.setButtonDisabler(false);
    this.getCountryIdFromRoute();
    this.getCountryFromId();
    this.getCitiesBycountry();
  }


  getCountryIdFromRoute() {
    this.id = + this.route.snapshot.paramMap.get('id');
  }

  getCountryFromId() {
    this.countryService.getOne(this.id)
      .subscribe((country: Country) => {
        this.countryForEdit = this.formBuilder.group({
          id: [country.id],
          name: [country.name, Validators.required]
        }),
          this.countryName = country.name;
      },
        err => {
          console.log(`ERRROR fetching ocuntrie (Id: ${this.id}) from database: `, err);
          this.router.navigate([`/${environment.errorRoute}`])
        });
  }

  getCitiesBycountry() {
    this.cityService.getCitiesByCountry(this.id).subscribe(
      (cities: City[]) => {
        cities.forEach((city: City) => {
          this.listOfCities.push({
            id: city.id,
            name: city.name,
            population: city.population
          });
        })
      },
      err => {
        console.log(`ERRROR fetching cities by country (id: ${this.id}) from database: `, err);
      });
  }

  updateCountry(form: FormGroup) {
    this.btnService.setButtonDisabler(true);
    this.countryService.put(form.value).subscribe(
      res => {
        console.log("COUNTRY SUCCESSFULLY CHANGED");
        form.markAsPristine();
        this.toastr.success('Country successfully changed!');
        this.btnService.setButtonDisabler(false);
      },
      err => {
        console.log("ERRROR changing country!", err);
        console.log(form.value);
        this.toastr.error('ERRROR changing country!');
        this.btnService.setButtonDisabler(false);
      }
    );
  }

}
