import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { SearchPeoplePage } from '../search-people/search-people';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { PostCommentsPage } from '../post-comments/post-comments';
import { LoginPage } from '../login/login';
import { AppUser } from '../../providers/app-user'
import { Auth } from '@ionic/cloud-angular';


@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})

export class FeedPage {

  public posts: Post[];
  public newCurrentUser: AppUser;
  liked;
  post;

  constructor(public auth: Auth, public userService: UserService, public navCtrl: NavController, public navParams: NavParams, public postService: Data) { 

  }
     
  ionViewWillEnter() { 
    this.getCurrentUser();
    this.loadPostsByFollowedUsers();
  }

  getCurrentUser() {
    this.newCurrentUser = this.userService.getCurrentUser();
  }

  loadPostsByFollowedUsers() {
    this.postService.loadPostsByFollowedUsers(this.newCurrentUser.follows)
      .subscribe(data => {
        this.posts = data;
    })
  }

  likePost(post: Post) {
    post.likes.push(this.newCurrentUser.userName);
    this.postService.update(post)
      .subscribe(response => {

      });
    let liked = true;
    return post;
  }

  unlikePost(post) {
    let data = {id: post._id, user: this.newCurrentUser.userName};
    this.postService.unlike(data)
      .subscribe(response => { });
    let liked = false;
    let index = post.likes.indexOf(this.newCurrentUser.userName);
    post.likes.splice(index, 1);
    return post;
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

  openSearch(tag) {
    this.navCtrl.push(SearchPeoplePage, { tag: tag });
    }

  openComments(post) {
    this.navCtrl.push(PostCommentsPage, { post: post });
  }

}
