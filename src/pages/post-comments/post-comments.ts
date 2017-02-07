import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-post-comments',
  templateUrl: 'post-comments.html'
})
export class PostCommentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  post = this.navParams.get('post');
  
  ionViewDidLoad() { }

  addComment(comment) {
    this.post.comments.push({user: "sirjuan", comment: comment});
  }

}
