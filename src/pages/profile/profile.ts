import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { AppUser } from '../../providers/app-user';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

   public posts: Post[];
   public postCount = 24;
   public followerCount = 26;
   public followCount = 20;
   public currentUser: AppUser;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data) {

    this.getCurrentUser();
    console.log(this.currentUser);
    this.loadPostsByUserId(this.currentUser._id);
  }

  ionViewDidLoad() {
      
  }
ionViewWillEnter() { 
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  loadPostsByUserId(id) {
    this.postService.loadPostsByUser(id)
      .subscribe(data => {
        this.posts = data;
      })
  }

}
