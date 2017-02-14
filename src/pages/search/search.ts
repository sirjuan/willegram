import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { SearchPeoplePage} from '../search-people/search-people';
import { AppUser } from '../../providers/app-user'
import { UserService } from '../../providers/user-service';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  public posts: Post[];
  public currentUser: AppUser;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data) { }

  ionViewWillEnter() { 
    this.getCurrentUser();
    this.loadPosts();
  }

  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
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