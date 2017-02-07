import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';


/*
  Generated class for the ProfileFeed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

   public posts: Post[];
   public postCount = 24;
   public followerCount = 26;
   public followCount = 20;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: Data) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
     this.loadPosts();
  }
     loadPosts() {
          this.postService.load()
        .subscribe(data => {
          this.posts = data;
        })
  }
       loadPost(post) {
          this.postService.loadPost(post)
        .subscribe(data => {
          this.posts = data;
        })
  }

}
