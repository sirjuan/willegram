export class Post {
  _id?: string;
  userId: string;
  userName: string;
  imageUrl: string;
  caption: string;
  postTime: string;
  tags: [string];
  likes: [string];
  comments: [{
    _id?: number;
    userId: string;
    userName: string;
    comment: string;
    commentTime: string;
  }];
  

}