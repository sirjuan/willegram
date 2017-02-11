import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { AppUser } from '../../providers/app-user';

@Component({
  selector: 'show-user',
  templateUrl: 'show-user.html'
})
export class ShowUserPage {

   public posts: Post[];
   public postCount = 24;
   public followerCount = 26;
   public followCount = 20;
   public currentUser: AppUser;
   user = this.navParams.get('user');
   same = false;
   followed = false;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data) {


  }

  ionViewDidLoad() {
      
  }
ionViewWillEnter() { 
    this.getCurrentUser();
    console.log(this.currentUser.userName);
    console.log(this.user);
    console.log(this.user.userName);
    this.loadPostsByUserId(this.user._id);
    if (this.user.userName == this.currentUser.userName) {
      this.same = true;
      console.log('sama on');
    }
    if (this.user.followers.indexOf(this.currentUser.userName) >= 0) { 
      this.followed = true;

    }
    console.log(this.same);
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

  followUser(user) {

      user.followers.push(this.currentUser.userName);
      this.currentUser.follows.push(user.userName);
      this.userService.update(user)
        .subscribe(response => {
         
         });
      this.userService.update(this.currentUser)
        .subscribe(response => {  
         });

        this.followed = true;

  }
  unFollowUser(user) {
   
    console.log('unFollowUser user');
    console.log(user);
    let data = {id: user._id, user: this.currentUser.userName};
    let data2 = {id: this.currentUser._id, user: user.userName};
    this.userService.unfollow(data)
      .subscribe(response => { });
    this.userService.unfollower(data2)
      .subscribe(response => { });
        this.followed = false;
    let index = this.user.followers.indexOf(this.currentUser.userName);
    this.user.followers.splice(index, 1);
    let index2 = this.currentUser.follows.indexOf(this.user.userName);
    this.currentUser.follows.splice(index2, 1);
  }

}
