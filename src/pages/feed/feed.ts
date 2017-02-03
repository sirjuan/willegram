import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { FeedContentPage} from '../feed-content/feed-content';


import { Auth, User } from '@ionic/cloud-angular';
import { LoginPage } from '../login/login';

/*
  Generated class for the Feed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  public posts: Post[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: Data, public user:User, public auth:Auth) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedPage');
    this.loadPosts();
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
