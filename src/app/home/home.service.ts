import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HTTP
  ) { }

  
}
