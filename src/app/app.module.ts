import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';


import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { FeedPage } from '../pages/feed/feed';
import { SearchPage } from '../pages/search/search';
import { Camera2Page } from '../pages/camera2/camera2';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { SearchPeoplePage } from '../pages/search-people/search-people';
import { FeedContentPage } from '../pages/feed-content/feed-content';
import { GridContentPage } from '../pages/grid-content/grid-content';

import { ShowPostPage } from '../pages/show-post/show-post';
import { ShowUserPage } from '../pages/show-user/show-user';
import { PostCommentsPage } from '../pages/post-comments/post-comments';


import { Data } from '../providers/data';
import { UserService } from '../providers/user-service';
import { DateService } from '../providers/date-service';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '05d00dcf'
  }
};


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    FeedPage,
    FeedContentPage,
    GridContentPage,
    Camera2Page,
    PostCommentsPage,
    SearchPage,
    SearchPeoplePage,
     ProfilePage,
    ShowPostPage,
    ShowUserPage,
    EditProfilePage

  ],
  imports: [
    IonicModule.forRoot(MyApp),

    CloudModule.forRoot(cloudSettings)
  
    
  
     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    TabsPage,
    FeedPage,
    PostCommentsPage,
    SearchPage,
    Camera2Page,
    ProfilePage,
    SearchPeoplePage,
    ShowPostPage,
    ShowUserPage,
    EditProfilePage
  ],
  providers: [{
    provide: ErrorHandler, 
    useClass: IonicErrorHandler}, 
    Data, 
    UserService, 
    DateService

   ]
})
export class AppModule {}
