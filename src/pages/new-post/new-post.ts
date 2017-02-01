import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/*
  Generated class for the NewPost page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})
export class NewPostPage {

  image;
  caption;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPostPage');
  }
    savePost(){
 
    let newPost = {
      image: this.image,
      caption: this.caption
    };
 
    this.view.dismiss(newPost);
 
  }
 
  close(){
    this.view.dismiss();
  }

}




 
