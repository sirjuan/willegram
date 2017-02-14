import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { DateService } from '../../providers/date-service';
import { AppUser } from '../../providers/app-user'

@Component({
  selector: 'edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  
  currentUser = this.navParams.get('currentUser');
  base64Image: string;

  constructor(public dateService: DateService, public userService: UserService, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private postService: Data ) {
  }

  changeProfilePicture() {
    this.userService.changeProfilePicture(this.currentUser.userName)
      .subscribe(data  => { });
    this.postService.changeProfilePicture(this.currentUser.userName)
      .subscribe(data  => { });
    this.postService.uploadImage(this.base64Image, this.currentUser.userName)
      .subscribe(data  => { });

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
    }, (err) => {
      console.log(err);
    });
  }

  takePicture(){
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      allowEdit: true,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
      console.log(err);
    });
  }

}
