import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';

import { Data } from '../../providers/data';
import { ShowPostPage } from '../show-post/show-post';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-grid-content',
  templateUrl: 'grid-content.html'
})
export class GridContentPage {
  @Input() posts: Post[];
  post: Post;
   currentUserName: string;
  currentUserId: string;

  constructor(public userService: UserService, storage: Storage, public navCtrl: NavController, public navParams: NavParams, private postService: Data) {

    this.getCurrentUser();

  }

  ionViewDidLoad() {  }

    getCurrentUser() {   
        this.userService.storage.get('currentUserName').then((data) => {
            this.currentUserName = data;       
        })    
        this.userService.storage.get('currentUserId').then((data) => {
            this.currentUserId = data;
        })
  }

  loadPost(post) {
    this.postService.loadPost(post)
                    .subscribe(data => {
      this.post = data;
      this.navCtrl.push(ShowPostPage, {post: this.post} );
    })
  }

}
