import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';
import { GridContentPage} from '../grid-content/grid-content';
import { SearchPeoplePage} from '../search-people/search-people';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  public posts: Post[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private postService: Data) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
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