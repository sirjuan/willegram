import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule }    from '@angular/http';
import { MyApp } from './app.component';
import {Camera} from 'ionic-native';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from '../pages/login/login';

import { RegisterPage } from '../pages/register/register';
import { FeedPage } from '../pages/feed/feed';
import { CameraPage } from '../pages/camera/camera';
import { NewPostPage } from '../pages/new-post/new-post';
import { PostCommentsPage } from '../pages/post-comments/post-comments';
import { ProfileFeedPage } from '../pages/profile-feed/profile-feed';
import { ProfilePicturesPage } from '../pages/profile-pictures/profile-pictures';
import { SearchPage } from '../pages/search/search';
import { SearchPeoplePage } from '../pages/search-people/search-people';
import { SearchTagsPage } from '../pages/search-tags/search-tags';


import { Register } from '../providers/register'
import { Auth } from '../providers/auth'




@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    FeedPage,
    CameraPage,
    NewPostPage,
    PostCommentsPage,
    ProfileFeedPage,
    ProfilePicturesPage,
    SearchPage,
    SearchPeoplePage,
    SearchTagsPage,
  


  ],
  imports: [
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    FeedPage,
    PostCommentsPage,
    SearchPage,
    NewPostPage,
    ProfileFeedPage,
    ProfilePicturesPage,
    CameraPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
