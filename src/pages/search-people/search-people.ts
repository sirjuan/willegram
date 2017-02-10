import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';
import { Data } from '../../providers/data';
import { Post } from '../../providers/post';

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
  postsByTag: Post[];
  usersByUserName;
  searchQuery;
  constructor(public postService: Data, public userService: UserService, public navCtrl: NavController, public navParams: NavParams, storage: Storage) {

    this.getCurrentUser();

  }
  tag = this.navParams.get('tag');
  ionViewDidLoad() { }

    getCurrentUser() {   
        this.userService.storage.get('currentUserName').then((data) => {
            this.currentUserName = data;       
        })    
        this.userService.storage.get('currentUserId').then((data) => {
            this.currentUserId = data;
        })
  }

  commenceSearch() {

    this.getPostsByTag(this.searchQuery);
    this.getUsersByUserName(this.searchQuery);

  }
  getUsersByUserName(userName) {
        this.userService.loadUsersByUserName(userName)
      .subscribe(data => {
        this.usersByUserName = data;
        console.log(this.usersByUserName);
      })
  }

  getPostsByTag(tag) {
    this.postService.loadPostsByTag(tag)
      .subscribe(data => {
        this.postsByTag = data;
        console.log(this.postsByTag)
      })
  }


}


