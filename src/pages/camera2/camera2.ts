import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Camera } from 'ionic-native';
import { NewPostPage } from '../new-post/new-post';
import { PostCommentsPage } from '../post-comments/post-comments';
import { Post } from '../../providers/post';
import { Data } from '../../providers/data';

@Component({
  selector: 'page-camera2',
  templateUrl: 'camera.html'
})
export class Camera2Page {

  public base64Image: string;
  public capt: string;
  posts: Post[];
  selectedPost: Post;

  
 
  image;
  caption;
  public dataposts;
    cameraData: string;
  photoTaken: boolean;
  cameraUrl: string;
  photoSelected: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private postService: Data ) {
       
  }

    selectFromGallery() {
    var options = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,
              targetWidth: 1000,
        targetHeight: 1000
    };
    Camera.getPicture(options).then((imageData) => {
      this.base64Image = imageData;
      this.photoSelected = true;
      this.photoTaken = false;
    }, (err) => {
      // Handle error
    });
  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photoTaken = true;
        this.photoSelected = false;     
    }, (err) => {
        console.log(err);
    });
  }

  getPosts(): void {
    
  
  }

//  addPost2(newImage, newCaption) {

//    this.posts.push({image: newImage, caption: newCaption});

//  }



  private getIndexOfPost = (postId: String) => {
    return this.posts.findIndex((post) => {
      return post._id === postId;
    });
  }

  selectPost(post: Post) {
    this.selectedPost = post
  }

  createNewPost() {
    var post: Post = {
  user: '',
  image: '',
  caption: '',
  comments: {
    user: '',
    content: '',
  }
    };

    // By default, a newly-created post will have the selected state.
    this.selectPost(post);
  }

  deletePost = (postId: String) => {
    var idx = this.getIndexOfPost(postId);
    if (idx !== -1) {
      this.posts.splice(idx, 1);
      this.selectPost(null);
    }
    return this.posts;
  }

  addPost = (post: Post) => {
    this.posts.push(post);
    this.selectPost(post);
    return this.posts;
  }

  updatePost = (post: Post) => {
    var idx = this.getIndexOfPost(post._id);
    if (idx !== -1) {
      this.posts[idx] = post;
      this.selectPost(post);
    }
    return this.posts;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');

         this.postService
      .getPosts()
      .then((posts: Post[]) => {
        this.posts = posts.map((post) => {
          if (!post.comments) {
            post.comments = {
              user: '',
              content: ''
            }
          }
          return post;
        });
      });

  }

}
