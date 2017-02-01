import { Component } from '@angular/core';

import { PostCommentsPage } from '../post-comments/post-comments';
import { FeedPage } from '../feed/feed';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { CameraPage } from '../camera/camera';
import { Camera2Page } from '../camera2/camera2';
import { NewPostPage } from '../new-post/new-post';
import { ProfileFeedPage } from '../profile-feed/profile-feed';
import { ProfilePicturesPage } from '../profile-pictures/profile-pictures';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ProfileFeedPage;
  tab2Root: any = Camera2Page;  
  tab3Root: any = CameraPage;
  tab4Root: any = FeedPage;
  tab5Root: any = LoginPage;
 

  constructor() {

  }
}
