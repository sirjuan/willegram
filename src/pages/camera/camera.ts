import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Camera } from 'ionic-native';
import { NewPostPage } from '../new-post/new-post';
import { PostCommentsPage } from '../post-comments/post-comments';
import { Post } from '.../providers/post';
import { Data } from '.../providers/data';


/*
  Generated class for the Camera page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html'
})
export class CameraPage {

  public base64Image: string;
  public capt: string;
  
  posts = [];
  image;
  caption;
  public dataposts;
    cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController ) {
       
  }

    selectFromGallery() {
    var options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
              targetWidth: 1000,
        targetHeight: 1000
    };
    Camera.getPicture(options).then((imageData) => {
      this.base64Image = imageData;
      this.photoSelected = true;
      this.photoTaken = false;
    }, (err) => {
      // Handle error
    });
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photoTaken = true;
        this.photoSelected = false;     
    }, (err) => {
        console.log(err);
    });
  }

  getPosts(): void {
    
  
  }

  addPost(newImage, newCaption) {

    this.posts.push({image: newImage, caption: newCaption});

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');

  }

}
