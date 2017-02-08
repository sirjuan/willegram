export class AppUser {
  _id?: string;
  userName: string;
  email: string;
  profilePictureUrl: string;
	followers: [{userId: string; userName: string;}];
	follows: [{userId: string; userName: string;}];
}