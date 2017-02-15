import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { SearchPeoplePage } from '../search-people/search-people';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { PostCommentsPage } from '../post-comments/post-comments';
import { ShowUserPage } from '../show-user/show-user';
import { AppUser } from '../../providers/app-user'

@Component({
  selector: 'page-feed-content',
  templateUrl: 'feed-content.html'
})

export class FeedContentPage {

  @Input() posts: Post[];
  public post: Post;  
  @Input() currentUser: AppUser;
  liked;
 

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: Data, public userService: UserService) { }

  ionViewWillEnter() { 
    this.getCurrentUser();
    this.loadPosts();
  }
  
  
  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
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
      .subscribe(response => {

      });
    let liked = true;
    return post;
  }

  unlikePost(post) {
    let data = {id: post._id, user: this.currentUser.userName};
    this.postService.unlike(data)
      .subscribe(response => { });
    let liked = false;
    let index = post.likes.indexOf(this.currentUser.userName);
    post.likes.splice(index, 1);
    return post;
  }

    openSearch(tag) {
    this.navCtrl.push(SearchPeoplePage, { tag: tag });
    }

  openComments(post) {
    this.navCtrl.push(PostCommentsPage, { post: post });
  }

  loadUser(user) {
    this.userService.loadUser(user.userId)
    .subscribe(data => {
      this.navCtrl.push(ShowUserPage, {user: data} );
    })
  }

}
