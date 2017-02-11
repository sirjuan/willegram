import { Injectable } from '@angular/core';
import { Headers, Http  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AppUser } from './app-user'

@Injectable()
export class UserService {
    
  usersUrl = 'https://peaceful-island-53615.herokuapp.com/api/users';
  public currentUser: AppUser;

  constructor (private http: Http) {
   
  }

 setCurrentUser(email) {       
     this.loadCurrentUser(email)
      .subscribe(data => {
        this.currentUser = data;
      })  
  }

  getCurrentUser() {
    return this.currentUser;
  }

  loadCurrentUser(email) {
    let url = `${this.usersUrl}/email/${email}`;
    return this.http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
    }

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

  loadUsersByUserName(userName) {

    let url = `${this.usersUrl}/userName/${userName}`;
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
    console.log('UserService body')
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(url, body, {headers: headers})
                    .map(() => user) //See mdn.io/arrowfunctions
                    .catch(this.handleError);
  }

      // Unfollow a user
  unfollow(user: AppUser, currentUser) {
    let url = `${this.usersUrl}/${user._id}/unfollow`; //see mdn.io/templateliterals
    let body = JSON.stringify({user: currentUser.userName, id: user._id });
    console.log('UserService body');
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(url, body, {headers: headers})
                    .map(() => user, currentUser) //See mdn.io/arrowfunctions
                    .catch(this.handleError);
  }
        // Update a post

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
