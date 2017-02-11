import { Component, Input } from '@angular/core';
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

  ionViewDidLoad() {
     

  }
  joo() {
    this.newCurrentUser = this.userService.getCurrentUser();
  }
  what() {
    console.log(this.newCurrentUser);
    console.log(this.posts);
  }
  ionViewWillEnter() { 
    this.getCurrentUser();
    this.loadPosts();
    console.log('willenter FeedPage');
    console.log(this.newCurrentUser);
    console.log(this.posts);
  }

  getCurrentUser() {
    this.newCurrentUser = this.userService.getCurrentUser();
  }

    openSearch(tag) {
    this.navCtrl.push(SearchPeoplePage, { tag: tag });
    
  }
  openComments(post) {
    this.navCtrl.push(PostCommentsPage, { post: post });
  }

  likePost(post: Post) {
      this.getCurrentUser();
      post.likes.push(this.newCurrentUser.userName);
      this.postService.update(post)
        .subscribe(response => {

        });
     
      let liked = true;
      return post;
  }

  unlikePost(post) {
    this.getCurrentUser();
    console.log('unLike post');
    console.log(post);
    let data = {id: post._id, user: this.newCurrentUser.userName};

    this.userService.unfollow(data)
      .subscribe(response => { });
    let liked = false;
    let index = post.likes.indexOf(this.newCurrentUser.userName);
    post.likes.splice(index, 1);
    return post;
  }

  loadPosts() {
    this.postService.load()
      .subscribe(data => {
    this.posts = data;
    })
  }

  logout() {
    this.auth.logout();
    this.navCtrl.setRoot(LoginPage);
  }

}
