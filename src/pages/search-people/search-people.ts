import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-search-people',
  templateUrl: 'search-people.html'
})

export class SearchPeoplePage {

  public postTime = '14 hours'
  public commentsCount = 7;
  public userName = 'sirjuan';
  public profilePictureUrl = 'assets/images/profile.jpg';
  public likeCount = 1578;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() { }

}
