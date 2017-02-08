import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-post-comments',
  templateUrl: 'post-comments.html'
})
export class PostCommentsPage {
   currentUserName: string;
  currentUserId: string;
  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, storage: Storage) {

this.getCurrentUser();

  }
  post = this.navParams.get('post');
  
  ionViewDidLoad() { }

    getCurrentUser() {   
        this.userService.storage.get('currentUserName').then((data) => {
            this.currentUserName = data;       
        })    
        this.userService.storage.get('currentUserId').then((data) => {
            this.currentUserId = data;
        })
  }

  addComment(comment) {
    this.post.comments.push({user: "sirjuan", comment: comment});
  }

}
