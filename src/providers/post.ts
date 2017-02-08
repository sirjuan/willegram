export class Post {
  _id?: string;
  userId: string;
  userName: string;
  imageUrl: string;
  caption: string;
  postTime: string;
  tags: [{userId: string; userName: string;}];
  likes: [{userId: string; userName: string;}];
  comments: [{
    _id?: number;
    userId: string;
    userName: string;
    comment: string;
    commentTime: string;
  }];
  

}