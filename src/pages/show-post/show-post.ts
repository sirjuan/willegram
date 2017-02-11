import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';



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
  public currentUser: AppUser;
  
  post = this.navParams.get('post');
    
  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data, public user:User, public auth:Auth) {

     
   }
 
  ionViewDidLoad() {  }


}

