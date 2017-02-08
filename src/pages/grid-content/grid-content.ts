import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';

import { Data } from '../../providers/data';
import { ShowPostPage } from '../show-post/show-post';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-grid-content',
  templateUrl: 'grid-content.html'
})
export class GridContentPage {
  @Input() posts: Post[];
  post: Post;
   currentUserName: string;
  currentUserId: string;

  constructor(storage: Storage, public navCtrl: NavController, public navParams: NavParams, private postService: Data) {}

  ionViewDidLoad() {  }

  loadPost(post) {
    this.postService.loadPost(post)
                    .subscribe(data => {
      this.post = data;
      this.navCtrl.push(ShowPostPage, {post: this.post} );
    })
  }

}
