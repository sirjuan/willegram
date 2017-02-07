import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Data } from '../../providers/data';



import { Auth, User } from '@ionic/cloud-angular';


/*
  Generated class for the Feed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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
  
  post = this.navParams.get('post');
    
  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: Data, public user:User, public auth:Auth) { }
 
  ionViewDidLoad() {  }

}
