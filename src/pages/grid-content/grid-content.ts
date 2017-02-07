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
  @Input() posts: Post[];
  post: Post;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: Data) {}

  ionViewDidLoad() {  }

  loadPost(post) {
    this.postService.loadPost(post)
                    .subscribe(data => {
      this.post = data;
      this.navCtrl.push(ShowPostPage, {post: this.post} );
    })
  }

}
