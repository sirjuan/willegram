import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';

import { SearchPeoplePage} from '../search-people/search-people';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  public posts: Post[];
   currentUserName: string;
  currentUserId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: Data, storage: Storage) {}

  ionViewDidLoad() {
    this.loadPosts();
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