import { Component } from '@angular/core';

import { PostCommentsPage } from '../post-comments/post-comments';
import { FeedPage } from '../feed/feed';

import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { CameraPage } from '../camera/camera';
import { Camera2Page } from '../camera2/camera2';
import { NewPostPage } from '../new-post/new-post';

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
