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

  public postTime = '14 hours'
  public commentsCount = 7;
  public userName = 'sirjuan';
  public profilePictureUrl = 'assets/images/profile.jpg';
  public likeCount = 1578;
  public liked = false;
  post;

  @Input() posts: Post[];
  
  public currentUser: AppUser;

  constructor(public navCtrl: NavController, public navParams: NavParams, public postService: Data, public userService: UserService) { 
     
     

   }

  ionViewDidLoad() { }

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
      this.getCurrentUser();
      post.likes.push(this.currentUser.userName);
      this.postService.update(post)
        .subscribe(response => {

        });
     
    this.liked = true;

  }

  unlikePost(post) {
    this.getCurrentUser();
    console.log('unLike post');
    console.log(post);
    let data = {id: post._id, user: this.currentUser.userName};

    this.userService.unfollow(data)
      .subscribe(response => { });
        this.liked = false;
    let index = this.post.likes.indexOf(this.currentUser.userName);
    this.post.likes.splice(index, 1);

  }

}
