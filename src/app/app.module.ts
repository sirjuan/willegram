import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule }    from '@angular/http';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { MyApp } from './app.component';
import {Camera} from 'ionic-native';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';


import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';

import { RegisterPage } from '../pages/register/register';
import { FeedPage } from '../pages/feed/feed';
import { FeedContentPage } from '../pages/feed-content/feed-content';
import { GridContentPage } from '../pages/grid-content/grid-content';
import { CameraPage } from '../pages/camera/camera';
import { Camera2Page } from '../pages/camera2/camera2';
import { NewPostPage } from '../pages/new-post/new-post';
import { ShowPostPage } from '../pages/show-post/show-post';
import { PostCommentsPage } from '../pages/post-comments/post-comments';

import { SearchPage } from '../pages/search/search';
import { SearchPeoplePage } from '../pages/search-people/search-people';
import { SearchTagsPage } from '../pages/search-tags/search-tags';
import { ProfilePage } from '../pages/profile/profile';


import { Register } from '../providers/register';
import { AuthService } from '../providers/auth-service';
import { Data } from '../providers/data';


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
    RegisterPage,
    FeedPage,
    FeedContentPage,
    GridContentPage,
    CameraPage,
    Camera2Page,
    NewPostPage,
    PostCommentsPage,
    SearchPage,
    SearchPeoplePage,
    SearchTagsPage,
    ProfilePage,
    ShowPostPage
    


  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,

    TabsPage,
    FeedPage,
    PostCommentsPage,
    SearchPage,
    NewPostPage,

    CameraPage,
    Camera2Page,
    ProfilePage,
    SearchPeoplePage,
    ShowPostPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Data ]
})
export class AppModule {}
