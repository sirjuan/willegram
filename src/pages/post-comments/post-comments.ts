import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-post-comments',
  templateUrl: 'post-comments.html'
})
export class PostCommentsPage {
   currentUserName: string;
  currentUserId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage) {}
  post = this.navParams.get('post');
  
  ionViewDidLoad() { }

  addComment(comment) {
    this.post.comments.push({user: "sirjuan", comment: comment});
  }

}
