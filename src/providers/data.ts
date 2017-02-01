import { Injectable } from '@angular/core';
import { Headers, Http, Response  } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Post } from './post'
import { POSTS } from './mock-posts';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class Data {
    private contactsUrl = '/api/contacts';

    constructor (private http: Http) {}

    // get("/api/contacts")
    getContacts(): Promise<Contact[]> {
      return this.http.get(this.contactsUrl)
                 .toPromise()
                 .then(response => response.json() as Contact[])
                 .catch(this.handleError);
    }

    // post("/api/contacts")
    createContact(newContact: Contact): Promise<Contact> {
      return this.http.post(this.contactsUrl, newContact)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }

    // get("/api/contacts/:id") endpoint not used by Angular app

    // delete("/api/contacts/:id")
    deleteContact(delContactId: String): Promise<String> {
      return this.http.delete(this.contactsUrl + '/' + delContactId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/contacts/:id")
    updateContact(putContact: Contact): Promise<Contact> {
      var putUrl = this.contactsUrl + '/' + putContact._id;
      return this.http.put(putUrl, putContact)
                 .toPromise()
                 .then(response => response.json() as Contact)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
