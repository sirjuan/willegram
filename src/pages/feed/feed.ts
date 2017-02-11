import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { Storage } from '@ionic/storage';
import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';
import { UserService } from '../../providers/user-service';
import { AppUser } from '../../providers/app-user'

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})

export class FeedPage {

  public posts: Post[];
  public currentUser: AppUser;

  constructor(public userService: UserService, storage: Storage, public navCtrl: NavController, public navParams: NavParams, private postService: Data, public user:User, public auth:Auth) { 
     
    }

  ionViewDidLoad() {
     

  }
  ionViewWillEnter() { 
    this.getCurrentUser();
    this.loadPosts();
  }

  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  loadPosts() {
    this.postService.load()
      .subscribe(data => {
    this.posts = data;
    })
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
