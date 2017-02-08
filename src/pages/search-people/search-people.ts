import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-search-people',
  templateUrl: 'search-people.html'
})

export class SearchPeoplePage {

  public postTime = '14 hours'
  public commentsCount = 7;
  public userName = 'sirjuan';
  public profilePictureUrl = 'assets/images/profile.jpg';
  public likeCount = 1578;
   currentUserName: string;
  currentUserId: string;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, storage: Storage) {

    this.getCurrentUser();
    
  }

  ionViewDidLoad() { }

    getCurrentUser() {   
        this.userService.storage.get('currentUserName').then((data) => {
            this.currentUserName = data;       
        })    
        this.userService.storage.get('currentUserId').then((data) => {
            this.currentUserId = data;
        })
  }

}


