export class Post {
  _id?: string;
  userId: string;
  userName: string;
  userProfilePictureUrl: string;
  imageUrl: string;
  caption: string;
  postTime: string;
  tags: [{userId: string; userName: string;}];
  likes: [string];
  comments: [{
    _id?: number;
    userId: string;
    userName: string;
    comment: string;
    commentTime: string;
  }];
  

}