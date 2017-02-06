import { Injectable } from '@angular/core';
import { Headers, Http, Response  } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Post } from './post'
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';


 

@Injectable()
export class Data {
    
    postsUrl = 'https://peaceful-island-53615.herokuapp.com/api/posts';

    constructor (private http: Http) {}

    // get("/api/posts")
    

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

      add(photo: string, post: string): Observable<Post> {
    let body = JSON.stringify({image: photo, caption: post});
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
  unlike(post: Post, like: string) {
    let url = `${this.postsUrl}/${post._id}/likes/`;
    let headers = new Headers({'Content-Type': 'application/json'});

    return this.http.delete(url + like, headers)
               .catch(this.handleError);
  }

    handleError(error) {
      console.error(error);
      return Observable.throw(error.json().error || 'Server error');
    }



}
