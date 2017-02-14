import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { SearchPeoplePage } from '../search-people/search-people';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { PostCommentsPage } from '../post-comments/post-comments';
import { AppUser } from '../../providers/app-user'

@Component({
  selector: 'page-feed-content',
  templateUrl: 'feed-content.html'
})

export class FeedContentPage {

  @Input() posts: Post[];
  public post: Post;  
  public currentUser: AppUser;
  public liked = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: Data, public userService: UserService) { }

  ionViewWillEnter() { 
    this.getCurrentUser();
    this.loadPosts();
    if (this.post.likes.indexOf(this.currentUser.userName) >= 0) { 
      this.liked = true;
    }
  }
  
  
  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  openSearch(tag) {
    this.navCtrl.push(SearchPeoplePage, { tag: tag });
    
  }
  openComments(post) {
    this.navCtrl.push(PostCommentsPage, { post: post });
  }

  loadPosts() {
    this.getCurrentUser();
    this.postService.load()
      .subscribe(data => {
        this.posts = data;
      })
  }

  likePost(post: Post) {
    post.likes.push(this.currentUser.userName);
    this.postService.update(post)
      .subscribe(response => {  });
    this.liked = true;

  }

  unlikePost(post) {
    let data = {id: post._id, user: this.currentUser.userName};
    this.userService.unfollow(data)
      .subscribe(response => { });
    this.liked = false;
    let index = this.post.likes.indexOf(this.currentUser.userName);
    this.post.likes.splice(index, 1);
  }

}
