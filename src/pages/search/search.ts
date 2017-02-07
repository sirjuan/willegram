import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';

import { SearchPeoplePage} from '../search-people/search-people';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {

  public posts: Post[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: Data) {}

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