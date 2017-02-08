import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

   public posts: Post[];
   public postCount = 24;
   public followerCount = 26;
   public followCount = 20;
    currentUserName: string;
  currentUserId: string;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data, storage: Storage) {

    this.getCurrentUser();
  }

  ionViewDidLoad() {
     this.loadPosts();
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

  loadPost(post) {
      this.postService.loadPost(post)
                      .subscribe(data => {
      this.posts = data;
    })
  }

}
