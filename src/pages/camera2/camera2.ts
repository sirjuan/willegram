import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { ImagePicker } from 'ionic-native';
//import { GalleryPage } from '../../gallery/gallery';
import { Storage } from '@ionic/storage';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { DateService } from '../../providers/date-service';

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
   currentUserName: string;
  currentUserId: string;
  images: [{}];
  newTime;



  ionViewDidLoad() {  }

  constructor(public dateService: DateService, public userService: UserService, storage: Storage, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private postService: Data ) {
       this.loadPosts();
        this.getCurrentUser();
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
  getNewTime() {
    this.newTime = this.dateService.getTime();

  }
  addPost(photo: string, post:string, tags ) {
    //tags = tags.replace(/,#/g, '');
  
    //tags.split(' ');
    console.log('tags');
    console.log(tags);
    let postTime = this.dateService.getTime();
    console.log('postTime');
    console.log(postTime);
    console.log('id');
    console.log(this.currentUserId);
    console.log('username');
    console.log(this.currentUserName);
    
    this.postService.add(this.base64Image, post, postTime, this.currentUserId, this.currentUserName, tags)
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
