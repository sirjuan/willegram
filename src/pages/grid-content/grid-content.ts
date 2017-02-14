import { Component, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { ShowPostPage } from '../show-post/show-post';
import { UserService } from '../../providers/user-service';
import { AppUser } from '../../providers/app-user';

@Component({
  selector: 'page-grid-content',
  templateUrl: 'grid-content.html'
})
export class GridContentPage {
  @Input() posts: Post[];
  public currentUser: AppUser;

  constructor(public userService: UserService, public navCtrl: NavController, public navParams: NavParams, private postService: Data) {}

  ionViewWillEnter() { 
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
  }

  loadPost(post) {
    this.postService.loadPost(post)
    .subscribe(data => {
      this.navCtrl.push(ShowPostPage, {post: data} );
    })
  }

}
