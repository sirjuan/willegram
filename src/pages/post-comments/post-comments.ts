import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { AppUser } from '../../providers/app-user';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-post-comments',
  templateUrl: 'post-comments.html'
})
export class PostCommentsPage {

  public currentUser: AppUser;
  post = this.navParams.get('post');

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, public postService: Data) { }

  ionViewWillEnter() { 
    this.getCurrentUser();
  }
  
  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  addComment(comment) {
    this.post.comments.push({userName: this.currentUser.userName, userProfilePictureUrl: this.currentUser.profilePictureUrl, comment: comment});
    this.postService.update(this.post)
    .subscribe(response => { });
  }

}
