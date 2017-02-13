import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';
import { SearchPeoplePage } from '../search-people/search-people';
import { PostCommentsPage } from '../post-comments/post-comments';

import { Auth, User } from '@ionic/cloud-angular';
import { AppUser } from '../../providers/app-user'
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-show-post',
  templateUrl: 'show-post.html'
})
export class ShowPostPage {

  public postTime = '14 hours'
  public commentsCount = 7;
  public userName = 'sirjuan';
  public profilePictureUrl = 'assets/images/profile.jpg';
  public likeCount = 1578;
  public newCurrentUser: AppUser;
  
  post = this.navParams.get('post');
  liked;
  
    
  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data, public user:User, public auth:Auth) {

     
   }
 
  ionViewDidLoad() {  }

    ionViewWillEnter() { 
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.newCurrentUser = this.userService.getCurrentUser();
  }

  openSearch(tag) {
    this.navCtrl.push(SearchPeoplePage, { tag: tag });
    
  }
  openComments(post) {
    this.navCtrl.push(PostCommentsPage, { post: post });
  }

  likePost(post) {
      this.getCurrentUser();
      post.likes.push(this.newCurrentUser.userName);
      this.postService.update(post)
        .subscribe(response => {

        });
     
    this.liked = true;

  }

  unlikePost(post) {
    this.getCurrentUser();
    console.log('unLike post');
    console.log(post);
    let data = {id: post._id, user: this.newCurrentUser.userName};

    this.userService.unfollow(data)
      .subscribe(response => { });
        this.liked = false;
    let index = this.post.likes.indexOf(this.newCurrentUser.userName);
    this.post.likes.splice(index, 1);

  }
}

