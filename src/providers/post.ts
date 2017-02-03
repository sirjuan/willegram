export class Post {
  _id?: string;
  user: string;
  image: string;
  caption: string;
  comments: {
    _id?: number;
    user: string;
    comment: string;
  }
}
