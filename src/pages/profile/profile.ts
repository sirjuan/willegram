import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { AppUser } from '../../providers/app-user';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  public posts: Post[];
  public currentUser: AppUser;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data) { 
    
   }

  ionViewWillEnter() { 
    this.getCurrentUser();
    this.loadPostsByUserId(this.currentUser._id);
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

  changePicture() {
    this.navCtrl.push(EditProfilePage, {currentUser: this.currentUser} );
  }

}
