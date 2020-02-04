import { HttpHeaders } from "@angular/common/http"

export class HeaderModel{
    headers: HttpHeaders = new HttpHeaders({
        "Content-Type": "application/json"
      });
}