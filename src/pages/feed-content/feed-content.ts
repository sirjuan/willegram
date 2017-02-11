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
    this.postService.load()
      .subscribe(data => {
        this.posts = data;
      })
  }

  likePost(post: Post) {

    if (post.likes.indexOf(this.currentUser.userName) < 0) {
      post.likes.push(this.currentUser.userName);
      this.postService.update(post)
        .subscribe(response => {

        });
     
    }

  }

    unlikePost(post: Post) {
      
      let index = post.likes.indexOf(this.currentUser.userName);
      post.likes.splice(index, 1);
    
      //    this.postService.unlike(post)
      //      .subscribe(res => {          
      //    });

    }

}
