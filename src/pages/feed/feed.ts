import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { Storage } from '@ionic/storage';
import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})

export class FeedPage {

  public posts: Post[];
   currentUserName: string;
  currentUserId: string;

  constructor(public userService: UserService, storage: Storage, public navCtrl: NavController, public navParams: NavParams, private postService: Data, public user:User, public auth:Auth) { 
     this.loadPosts();
     this.getCurrentUser();
   }

  ionViewDidLoad() {
    

  }

      getCurrentUser() {   
        this.userService.storage.get('currentUserName').then((data) => {
            this.currentUserName = data;       
        })    
        this.userService.storage.get('currentUserId').then((data) => {
            this.currentUserId = data;
        })
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
