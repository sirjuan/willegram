import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Post } from './post'
import { POSTS } from './mock-posts';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class Data {

   getPosts(): Promise<Post[]> {
    return Promise.resolve(POSTS);
  }

  addPosts() {
    
  }

}

 
