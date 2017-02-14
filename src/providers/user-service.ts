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

  constructor (private http: Http) {  }

  setCurrentUser(data) {
    this.currentUser = data;
  }

  changeProfilePicture(userName) {
    let url = `${this.usersUrl}/changeProfilePicture/${userName}`;
    let imageUrl = {userProfilePictureUrl: 'http://res.cloudinary.com/hfttspdhh/image/upload/' + userName + '.jpg'};
    let body = JSON.stringify(imageUrl)
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers})
                    .map(() => url) //See mdn.io/arrowfunctions
                    .catch(this.handleError);
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
    let url = `${this.usersUrl}/${user._id}`;
    let body = JSON.stringify(user)
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers})
                    .map(() => user) 
                    .catch(this.handleError);
  }

      // Unfollow a user
  unfollow(data) {
    let url = `${this.usersUrl}/${data.id}/unfollow/${data.user}`; 
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers})
                    .map(() => data) 
                    .catch(this.handleError);
  }

    unfollower(data) {
    let url = `${this.usersUrl}/${data.id}/unfollower/${data.user}`;
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers})
                    .map(() => data) 
                    .catch(this.handleError);
  }
     

    handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }



}
