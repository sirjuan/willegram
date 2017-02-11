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



      loadPostsByTag(tag) {

    let url = `${this.postsUrl}/tags/${tag}`;
    return this.http.get(url)
               .map(res => res.json())
               .catch(this.handleError);
  }

      add(photo, post, postTime, userId, userName, tags, userPhoto): Observable<Post> {
    let body = JSON.stringify({imageUrl: photo, caption: post, postTime: postTime, userId: userId, userName: userName, tags: tags, userPhoto: userPhoto});
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.post(this.postsUrl, body, {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
  }


    // Update a post
  update(post: Post) {
    let url = `${this.postsUrl}/${post._id}`; //see mdn.io/templateliterals
    let body = JSON.stringify(post)
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(url, body, {headers: headers})
                    .map(() => post) //See mdn.io/arrowfunctions
                    .catch(this.handleError);
  }
    
  // Unlike
      // Unfollow a user
  unlike(data) {
    let url = `${this.postsUrl}/${data.id}/unlike/${data.user}`; //see mdn.io/templateliterals
    let body = JSON.stringify(data);
    console.log('UserService body');
    console.log(body);
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.put(url, body, {headers: headers})
                    .map(() => data) //See mdn.io/arrowfunctions
  }                

    handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }



}
