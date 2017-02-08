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
  currentUserName: string;
  currentUserId: string;

  constructor (private http: Http, storage: Storage) {
       
  }

  // currentUser functions

  setCurrentUser(data) {
    console.log('setCurrentUser data');
    console.log(data);
    this.storage.set('currentUserName', data.userName);
    this.storage.set('currentUserId', data._id);
    console.log('storage keys');
    console.log(this.storage.keys());
    console.log(this.storage.get('currentUserName'));

    let currentUser = {currentUserName: data.userName, currentUserId: data._id};
        console.log('setCurrentUser this.currentUser');
    console.log(this.currentUser);
    return this.currentUser;            
    
  }

  getCurrentUserName() {
    let userName;
    userName = this.storage.get('currentUserName').then((val) => {
        userName = val;   
        
     })
     console.log(userName);
     console.log(userName.val);
     return userName.val;

  }

  getCurrentUserId() {
    
     this.storage.get('currentUserId').then((val) => {
        console.log('Your user id is', val);
         return val;
     })

  }

  clearCurrentUser() {
    this.currentUser = {currentUserName: '', currentUserId: ''};
  }
    
  // get("/api/users")

  load(): Observable<AppUser[]> {
    return this.http.get(this.usersUrl)
               .map(res => res.json())
               .catch(this.handleError);
  }

  loadUser(user: AppUser) {

    let url = `${this.usersUrl}/${user._id}`;
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
