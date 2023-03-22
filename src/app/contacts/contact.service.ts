import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
//import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  //  private contactUrl = 'https://cmsproject-1eac7-default-rtdb.firebaseio.com/contacts.json';
  private contactUrl ="http://localhost:3000/contacts"
  contacts: Contact[]=[];
  //maxContactId: string;

  constructor(private http: HttpClient) {
    // this.maxContactId =this.getMaxId()
   // this.contacts = MOCKCONTACTS;
  }

  getContacts() {
    this.http
      .get<{ message: string; contacts: Contact[] }>(this.contactUrl)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts = res.contacts;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }
  
  sortAndSend() {
    this.contacts.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (!newContact) return;
    newContact.id = '';
    this.http
      .post<{ message: string; contact: Contact }>(
        this.contactUrl,
        newContact,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts.push(res.contact);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }


  updateContact(original: Contact, newContact: Contact) {
    if (!newContact || !original) return;
    const pos = this.contacts.indexOf(original);
    if (pos < 0) return;

    newContact.id = original.id;
    // newContact._id = original._id;
    this.http
      .put<{ message: string }>(
        `${this.contactUrl}/${original.id}`,
        newContact,
        {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts[pos] = newContact;
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }


  deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.http
      .delete<{ message: string }>(`${this.contactUrl}/${contact.id}`)
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.contacts.splice(pos, 1);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }
  getContact(id: string): Contact {
    for(const contact of this.contacts){
      if(contact.id === id){
      return contact;
    }
    // return this.contacts.find((c) => c.id ===id);
  }
  return null!;
}
// storeContacts() {
  
//     let contacts = JSON.stringify(this.contacts);
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json'
//     });

//     this.http.put(this.contactUrl, contacts, { headers: headers })
//       .subscribe(
//         () => {
//           this.contactListChangedEvent.next(this.contacts.slice());
//         }
//       )
//   }

// deleteContact(contact: Contact) {
//   if (!contact) return;
//   const pos = this.contacts.indexOf(contact);
//   if (pos < 0) return;
//   this.contacts.splice(pos, 1);
//   this.storeContacts();
//   // this.contactListChangedEvent.next(this.contacts.slice());
// }
// getMaxId(): number {
//   let maxId = 0;

//   for (const contact of this.contacts) {
//     const currentId = +contact.id;
//     if (currentId > maxId) {
//       maxId = currentId;
//     }
//   }
//   return maxId;
       
// }

// addContact(newContact: Contact){
//   if (newContact === null || newContact === undefined) return;
//   this.maxContactId++;
//   newContact.id = `${this.maxContactId}`;
//   this.contacts.push(newContact);
//   this.storeContacts();
//   // this.contactListChangedEvent.next(this.contacts.slice())
// }

// updateContact(original: Contact, newContact: Contact){
//   if (original === null || original === undefined ||
//     newContact===null || newContact.id === undefined)
//     {
//       return;
//     }
// const pos = this.contacts.indexOf(original);
// if (pos < 0) return;

// newContact.id = original.id;
// this.contacts[pos] = newContact;
// this.storeContacts();
// // this.contactListChangedEvent.next(this.contacts.slice());
  
//   }
}