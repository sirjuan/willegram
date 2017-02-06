import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the PostComments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-post-comments',
  templateUrl: 'post-comments.html'
})
export class PostCommentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  comments = this.navParams.get('comments');
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostCommentsPage');
    console.log(this.comments);
  }

}
