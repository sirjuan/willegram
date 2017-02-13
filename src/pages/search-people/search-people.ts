import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserService } from '../../providers/user-service';
import { Data } from '../../providers/data';
import { Post } from '../../providers/post';
import { AppUser } from '../../providers/app-user'
import { ShowPostPage } from '../show-post/show-post';
import { ShowUserPage } from '../show-user/show-user';

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
  public currentUser: AppUser;
  postsByTag: Post[];
  usersByUserName;
  searchQuery;
  constructor(public postService: Data, public userService: UserService, public navCtrl: NavController, public navParams: NavParams
  ) {

    this.getCurrentUser();

  }
  tag = this.navParams.get('tag');
  ionViewDidLoad() { }
ionViewWillEnter() { 
    this.getCurrentUser();
  }
  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  commenceSearch() {
    if (this.searchQuery.length > 0) {

      this.getPostsByTag(this.searchQuery);
    this.getUsersByUserName(this.searchQuery);
    }
    

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
  loadPost(post) {
    this.postService.loadPost(post)
                    .subscribe(data => {
      
      this.navCtrl.push(ShowPostPage, {post: data} );
    })
  }

    loadUser(user) {
    this.userService.loadUser(user._id)
                    .subscribe(data => {
      
      this.navCtrl.push(ShowUserPage, {user: data} );
    })
  }

}


