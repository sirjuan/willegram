import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { AppUser } from '../../providers/app-user';

@Component({
  selector: 'page-post-comments',
  templateUrl: 'post-comments.html'
})
export class PostCommentsPage {
  public currentUser: AppUser;
  public liked = false;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams) {
    this.getCurrentUser();

  }

  ionViewWillEnter() { 
    this.getCurrentUser();
  }
  
  post = this.navParams.get('post');
  
  ionViewDidLoad() { }



  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  addComment(comment) {
    this.post.comments.push({userName: this.currentUser.userName, userProfilePictureUrl: this.currentUser.profilePictureUrl, comment: comment});
  }

}
