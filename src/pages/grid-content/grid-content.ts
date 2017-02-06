import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';

import { Data } from '../../providers/data';
import { ShowPostPage } from '../show-post/show-post';


@Component({
  selector: 'page-grid-content',
  templateUrl: 'grid-content.html'
})
export class GridContentPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: Data) {}
@Input() posts: Post[];

post: Post;
onePostArray: Post[];

  ionViewDidLoad() {
    console.log('ionViewDidLoad GridContentPage');
  }
         loadPost(post) {
          console.log('loading');
          console.log(post)
          this.postService.loadPost(post)
        .subscribe(data => {
          this.post = data;
          console.log(this.post);
          
          this.navCtrl.push(ShowPostPage, {post: this.post} );
        })
  }

}
