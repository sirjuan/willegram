import { Injectable } from '@angular/core';
import { Headers, Http  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AppUser } from './app-user'
import { Storage } from '@ionic/storage';

@Injectable()
export class UserService {
    
  public currentUser;
  usersUrl = 'https://peaceful-island-53615.herokuapp.com/api/users';
  storage = new Storage();
  currentUserName;
  currentUserId: string;

  constructor (private http: Http, storage: Storage) {
       
  }

  // currentUser functions

  setCurrentUser(data) {

    this.storage.set('currentUserName', data.userName);
    this.storage.set('currentUserId', data._id);
 
    console.log('data.userName');
    console.log('data.userId');


               
    
  }


getToken: Observable<any> = 
    Observable.fromPromise(this.storage.get('currentUserName').then(currentUserName => {
      console.log(('before parse', currentUserName));
    
        return currentUserName;
}));


  clearCurrentUser() {
    this.currentUser = {currentUserName: '', currentUserId: ''};
  }
    
  // get("/api/users")

  load(): Observable<AppUser[]> {
    return this.http.get(this.usersUrl)
               .map(res => res.json())
               .catch(this.handleError);
  }

  loadUser(id) {

    let url = `${this.usersUrl}/${id}`;
    return this.http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
  }

  loadCurrentUser(email) {

    let url = `${this.usersUrl}/email/${email}`;
    return this.http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
       
   }

  add(userName: string, email: string): Observable<AppUser> {
 
    let body = JSON.stringify({userName: userName, email: email});
    
    let headers = new Headers({'Content-Type': 'application/json'});
  
    return this.http.post(this.usersUrl, body, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
  }


    // Update a user
  update(user: AppUser) {
    let url = `${this.usersUrl}/${user._id}`; //see mdn.io/templateliterals
    let body = JSON.stringify(user)
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(url, body, {headers: headers})
                    .map(() => user) //See mdn.io/arrowfunctions
                    .catch(this.handleError);
  }
    
  // Unlike
  unlike(user: AppUser) {
    let url = `${this.usersUrl}/${user._id}`;
    let body = JSON.stringify(user)
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(url, body, {headers: headers})
                    .map(() => user) //See mdn.io/arrowfunctions
                    .catch(this.handleError);
  }

    handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }



}
