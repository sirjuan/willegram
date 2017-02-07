import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { Post } from '../../providers/post';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-camera2',
  templateUrl: 'camera.html'
})
export class Camera2Page {

  public base64Image: string;
  public posts: Post[];
  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;

  ionViewDidLoad() {  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private postService: Data ) {
       this.loadPosts();
  }

  loadPosts() {
      this.postService.load()
        .subscribe(data => {
          this.posts = data;
        })
  }

  addPost(photo: string, post:string) {
    this.postService.add(this.base64Image, post)
        .subscribe(data  => {
          this.posts.push(data)
        });
  }

  selectFromGallery() {
    var options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    };
    Camera.getPicture(options).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.photoSelected = true;
      this.photoTaken = false;
    }, (err) => {
      // Handle error
    });
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        allowEdit: true,
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

}
