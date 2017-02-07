import { Component } from '@angular/core';

import { FeedPage } from '../feed/feed';
import { SearchPage } from '../search/search';
import { Camera2Page } from '../camera2/camera2';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = FeedPage;
  tab2Root: any = SearchPage;
  tab3Root: any = Camera2Page;  
  tab4Root: any = ProfilePage;
  
 

  constructor() {

  }
}
