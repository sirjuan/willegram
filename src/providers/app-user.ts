export class AppUser {
  _id?: string;
  userName: string;
  email: string;
  profilePictureUrl: string;
	followers: [string];
	follows: [string];
}