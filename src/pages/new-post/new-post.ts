import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})

export class NewPostPage {

  image;
  caption;

  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController) {  }

  ionViewDidLoad() {  }
    
  savePost(){
    let newPost = {
            image: this.image,
            caption: this.caption
      };

    this.view.dismiss(newPost);
  }

  close() {
    this.view.dismiss();
  }

}




 
