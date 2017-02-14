import { Injectable } from '@angular/core';
import { Headers, Http  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Post } from './post'

@Injectable()
export class Data {
    
  postsUrl = 'https://peaceful-island-53615.herokuapp.com/api/posts';
  imagesUrl = 'https://peaceful-island-53615.herokuapp.com/api/images';

  constructor (private http: Http) {}

  load(): Observable<Post[]> {
    return this.http.get(this.postsUrl)
               .map(res => res.json())
               .catch(this.handleError);
  }

  loadPost(post: Post) {
    let url = `${this.postsUrl}/${post._id}`;
    return this.http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
  }

  loadPostsByUser(userId) {
    let url = `${this.postsUrl}/user/${userId}`;
    return this.http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
  }

  loadPostsByFollowedUsers(users) {
    users = users.join('');
    let url = `${this.postsUrl}/followed/${users}`;
    return this.http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
  }  

  loadPostsByTag(tag) {
    let url = `${this.postsUrl}/tags/${tag}`;
    return this.http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
  }

  add(photo, post, postTime, userId, userName, tags, userPhoto): Observable<Post> {
    let body = JSON.stringify({imageUrl: photo, caption: post, postTime: postTime, userId: userId, userName: userName, tags: tags, userPhoto: userPhoto});
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.postsUrl, body, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
  }

  uploadImage(imageUrl, id): Observable<Post> {
    let url = `${this.imagesUrl}/upload`;
    let body = JSON.stringify({id: id, url: imageUrl});
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(url, body, {headers: headers})
              .map(res => res.json())
              .catch(this.handleError);
  }

    // Update a post
  addImage(id) {
    let url = `${this.postsUrl}/addImage/${id}`; 
    let imageUrl = {imageUrl: 'http://res.cloudinary.com/hfttspdhh/image/upload/' + id + '.jpg'};
    let body = JSON.stringify(imageUrl)
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers})
                    .map(() => url) 
                    .catch(this.handleError);
  }


  changeProfilePicture(userName) {
    let url = `${this.postsUrl}/changeProfilePicture/${userName}`; 
    let imageUrl = {userProfilePictureUrl: 'http://res.cloudinary.com/hfttspdhh/image/upload/' + userName + '.jpg'};
    let body = JSON.stringify(imageUrl)
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers})
                    .map(() => url) 
                    .catch(this.handleError);
  }

    // Update a post
  update(post: Post) {
    let url = `${this.postsUrl}/${post._id}`;
    let body = JSON.stringify(post)
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers})
                    .map(() => post)
                    .catch(this.handleError);
  }
    
  // Unlike
  unlike(data) {
    let url = `${this.postsUrl}/${data.id}/unlike/${data.user}`;
    let body = JSON.stringify(data);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(url, body, {headers: headers})
                    .map(() => data)
  }                

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }



}
