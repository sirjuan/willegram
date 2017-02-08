import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';
import { TabsPage } from '../tabs/tabs';

import { UserService } from '../../providers/user-service';
import { AppUser } from '../../providers/app-user';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [UserService]
})
export class LoginPage {

  showLogin:boolean = true;
  email:string = '';
  password:string = '';
  name:string = '';
  register = false;
  public users: AppUser[];
   currentUserName: string;
  currentUserId: string;

  constructor(storage: Storage, public navCtrl: NavController, public auth:Auth, public userService: UserService, public user: User, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
    this.loadUsers();
    this.getCurrentUser();
  }

  ionViewDidLoad() {  }

    getCurrentUser() {   
        this.userService.storage.get('currentUserName').then((data) => {
            this.currentUserName = data;       
        })    
        this.userService.storage.get('currentUserId').then((data) => {
            this.currentUserId = data;
        })
  }

      loadUsers() {
      this.userService.load()
        .subscribe(data => {
          this.users = data;
        })
  }
    setCurrentUser(email) {
    this.userService.loadCurrentUser(email)
      .subscribe(data => {
    this.userService.setCurrentUser(data);
    })
  }
  
  /*
  for both of these, if the right form is showing, process the form,
  otherwise show it
  */
  doLogin() {
    if(this.showLogin) {
   
      if(this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Register Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }     

      let loader = this.loadingCtrl.create({
        content: "Logging in..."
      });
      loader.present();
      this.setCurrentUser(this.email);
      this.auth.login('basic', {'email':this.email, 'password':this.password}).then(() => {
        
        
        loader.dismissAll();
       
     
        
        this.navCtrl.setRoot(TabsPage);        
      }, (err) => {
        loader.dismissAll();
       
        let errors = '';
        if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
        if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

        let alert = this.alertCtrl.create({
          title:'Login Error', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
    } else {
      this.showLogin = true;
    }
  }
  registerForm() {
    this.showLogin = false;
  }

  addUser(userName: string, email:string) {
    this.userService.add(userName, email)
        .subscribe(data  => {
          this.users.push(data)
        });
  }

  doRegister() {
    if(!this.showLogin) {
  
      /*
      do our own initial validation
      */
      if(this.name === '' || this.email === '' || this.password === '') {
        let alert = this.alertCtrl.create({
          title:'Register Error', 
          subTitle:'All fields are rquired',
          buttons:['OK']
        });
        alert.present();
        return;
      }

      let details: UserDetails = {'email':this.email, 'password':this.password, 'name':this.name};
      
      let loader = this.loadingCtrl.create({
        content: "Registering your account..."
      });
      loader.present();
      console.log('detailit loginissa: ' + this.name + this.email)
      
      this.addUser(this.name, this.email);

      this.auth.signup(details).then(() => {
        this.auth.login('basic', {'email':details.email, 'password':details.password}).then(() => {
          loader.dismissAll();
          this.navCtrl.setRoot(TabsPage);
        });

      }, (err:IDetailedError<string[]>) => {
        loader.dismissAll();
        let errors = '';
        for(let e of err.details) {
          if(e === 'required_email') errors += 'Email is required.<br/>';
          if(e === 'required_password') errors += 'Password is required.<br/>';
          if(e === 'conflict_email') errors += 'A user with this email already exists.<br/>';
          //don't need to worry about conflict_username
          if(e === 'invalid_email') errors += 'Your email address isn\'t valid.';
        }
        let alert = this.alertCtrl.create({
          title:'Register Error', 
          subTitle:errors,
          buttons:['OK']
        });
        alert.present();
      });
     
    } else {
      this.showLogin = false;
    }
  }

}