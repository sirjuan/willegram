import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';

import { SearchPeoplePage} from '../search-people/search-people';
import { Storage } from '@ionic/storage';
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  public posts: Post[];
   currentUserName: string;
  currentUserId: string;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data, storage: Storage) {

    this.getCurrentUser();
    
  }

  ionViewDidLoad() {
    this.loadPosts();
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
  openSearch() {
    this.navCtrl.push(SearchPeoplePage);
  }

}