import { Observable } from "rxjs";

export interface City {
    id?: number;
    name: string;
    population?: number;
    countryId?: number;
    countryName?: Observable<string>;
}
