import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { SearchPeoplePage } from '../search-people/search-people';
import { Data } from '../../providers/data';
import { UserService } from '../../providers/user-service';
import { PostCommentsPage } from '../post-comments/post-comments';
import { Storage } from '@ionic/storage';
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

  currentUserName;
  currentUserId;

  @Input() posts: Post[];
  post: Post;
  constructor(storage: Storage, public navCtrl: NavController, public navParams: NavParams, public postService: Data, public userService: UserService) { 
     
     this.getCurrentUser();

   }

  ionViewDidLoad() { }
  
  
  getCurrentUser() {   
        this.userService.storage.get('currentUserName').then((data) => {
            this.currentUserName = data;       
        })    
        this.userService.storage.get('currentUserId').then((data) => {
            this.currentUserId = data;
        })
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

  likePost(user, post: Post) {

    if (post.likes.indexOf(this.currentUserName) < 0) {
      post.likes.push(user);
      this.postService.update(post)
        .subscribe(response => {

        });
     
    }

  }

    unlikePost(user, post: Post) {
      
      let index = post.likes.indexOf(user);
      post.likes.splice(index, 1);
    
      //    this.postService.unlike(post)
      //      .subscribe(res => {          
      //    });

    }

}
