import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


@Injectable()
export class Data {



  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Data Provider');
  }
    getData() {
    return this.storage.get('posts');  
  }

   getHeroes(): void {} // stub
 
  save(data){
    let newData = JSON.stringify(data);
    this.storage.set('posts', newData);
  }
 
}





 
 
