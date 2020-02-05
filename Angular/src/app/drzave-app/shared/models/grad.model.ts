import { Observable } from "rxjs";

export interface Grad {
    id?: number;
    ime: string;
    populacija?: number;
    drzavaId?: number;
    drzavaIme?: Observable<string>;
}
