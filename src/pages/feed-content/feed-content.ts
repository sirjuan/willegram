import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';

import { Data } from '../../providers/data';
import { PostCommentsPage } from '../post-comments/post-comments';

/*
  Generated class for the FeedContent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed-content',
  templateUrl: 'feed-content.html'
})
export class FeedContentPage {

  public postTime = '14 hours'
  public commentsCount = 7;
  public userName = 'sirjuan';
  public profilePictureUrl = 'assets/images/profile.jpg';
  public likeCount = 1578;

@Input() posts: Post[];
post: Post;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(this.posts);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedContentPage');
    console.log(this.post.comments.user)
   
  }

  openComments(post) {
    this.navCtrl.push(PostCommentsPage, {user: this.post.comments.user, comment: this.post.comments.comment} );
  }

}
