import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';

import { Data } from '../../providers/data';
import { PostCommentsPage } from '../post-comments/post-comments';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: Data) {  }
  
  ionViewDidLoad() {  }

  openComments(post) {
    this.navCtrl.push(PostCommentsPage, { post: post });
  }

  loadPosts() {
    this.postService.load()
      .subscribe(data => {
        this.posts = data;
      })
  }

  likePost(user: string, post: Post) {

    if (post.likes.indexOf(user) < 0) {
      post.likes.push(user);
      this.postService.update(post)
        .subscribe(response => {

        });
     
    }

  }

    unlikePost(user: string, post: Post) {
      
      let index = post.likes.indexOf(user);
      post.likes.splice(index, 1);
    
      //    this.postService.unlike(post)
      //      .subscribe(res => {          
      //    });

    }

}
