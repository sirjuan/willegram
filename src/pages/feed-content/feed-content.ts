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

  public liked = false;


  public postTime = '14 hours'
  public commentsCount = 7;
  public userName = 'sirjuan';
  public profilePictureUrl = 'assets/images/profile.jpg';
  public likeCount = 1578;

  @Input() posts: Post[];
  post: Post;
  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: Data) {
    console.log(this.posts);

  
  
     }
  ionViewDidLoad() {


  }

  openComments(post) {

    console.log(post.comments);


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
      this.liked = true;

    }

  }

    unlikePost(user: string, post: Post) {
      console.log(user);
       console.log(post);
       

    let index = post.likes.indexOf(user);

    console.log(index);
    post.likes.splice(index, 1);
    
//    this.postService.unlike(post)
  //      .subscribe(res => {
          
    //    });
        this.liked = false;

        console.log(post);
  }



  //  like() {
  //    this.liked = true;
  //    console.log('like: ' + this.liked); 
  //  }

  unlike() {
    this.liked = false;
    console.log('unlike: ' + this.liked);
  }

}
