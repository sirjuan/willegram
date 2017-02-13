import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';



import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { DateService } from '../../providers/date-service';
import { AppUser } from '../../providers/app-user'

@Component({
  selector: 'page-camera2',
  templateUrl: 'camera.html'
})
export class Camera2Page {

  base64Image: string;
  
  public posts: Post[];
  cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;
  images: [{}];
  newTime;
  public currentUser: AppUser;
  public imageUrl;

  ionViewDidLoad() { }

  ionViewWillEnter() { 
    this.getCurrentUser();
    this.base64Image = 'jep';
  }

  constructor(public dateService: DateService, public userService: UserService, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private postService: Data ) {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  getNewTime() {
    this.newTime = this.dateService.getTime();
  }

  addPost(post:string, tags ) {
    tags = tags.replace(/#/g, '');
    tags = tags.replace(/,/g, '');
    tags = tags.split(' ');
    let postTime = this.dateService.getTime();
    this.getCurrentUser();
    var url = "http://www.quickanddirtytips.com/sites/default/files/images/7832/plural-of-mongoose.jpg"
    
    console.log(this.currentUser);
    this.postService.add(this.base64Image, post, postTime, this.currentUser._id, this.currentUser.userName, tags, this.currentUser.profilePictureUrl)
    .subscribe(data  => {
          this.imageUrl = data._id;
          console.log('addpostin sisällä responsedata')
          console.log(data._id);
          this.postService.uploadImage(this.base64Image, data._id)
              .subscribe(data  => {
             
                console.log('hiphip')
            
           });
            this.postService.addImage(data._id)
                          .subscribe(data  => {
                            
                console.log('hophop');
                console.log(data);
            
           });
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
      console.log('select from gallery urii')
      console.log(this.base64Image)
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
