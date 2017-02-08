import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';



import { Auth, User } from '@ionic/cloud-angular';
import { Storage } from '@ionic/storage';
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
  currentUserName: string;
  currentUserId: string;
  
  post = this.navParams.get('post');
    
  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data, public user:User, public auth:Auth, storage: Storage) {

    this.getCurrentUser();
    
   }
 
  ionViewDidLoad() {  }

    getCurrentUser() {   
        this.userService.storage.get('currentUserName').then((data) => {
            this.currentUserName = data;       
        })    
        this.userService.storage.get('currentUserId').then((data) => {
            this.currentUserId = data;
        })
  }
}

