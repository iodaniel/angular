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

   private contactUrl = 'https://cmsproject-1eac7-default-rtdb.firebaseio.com/contacts.json';
  contacts: Contact[]=[];
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.maxContactId =this.getMaxId()
   // this.contacts = MOCKCONTACTS;
  }

  getContacts():Contact[] {
    this.http
      .get<Contact[]>(this.contactUrl)
      .subscribe((contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.contactListChangedEvent.next(this.contacts.slice());
      });

    return this.contacts.slice();
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
storeContacts() {
  
    let contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(this.contactUrl, contacts, { headers: headers })
      .subscribe(
        () => {
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      )
  }

deleteContact(contact: Contact) {
  if (!contact) return;
  const pos = this.contacts.indexOf(contact);
  if (pos < 0) return;
  this.contacts.splice(pos, 1);
  this.storeContacts();
  // this.contactListChangedEvent.next(this.contacts.slice());
}
getMaxId(): number {
  let maxId = 0;

  for (const contact of this.contacts) {
    const currentId = +contact.id;
    if (currentId > maxId) {
      maxId = currentId;
    }
  }
  return maxId;
       
}

addContact(newContact: Contact){
  if (newContact === null || newContact === undefined) return;
  this.maxContactId++;
  newContact.id = `${this.maxContactId}`;
  this.contacts.push(newContact);
  this.storeContacts();
  // this.contactListChangedEvent.next(this.contacts.slice())
}

updateContact(original: Contact, newContact: Contact){
  if (original === null || original === undefined ||
    newContact===null || newContact.id === undefined)
    {
      return;
    }
const pos = this.contacts.indexOf(original);
if (pos < 0) return;

newContact.id = original.id;
this.contacts[pos] = newContact;
this.storeContacts();
// this.contactListChangedEvent.next(this.contacts.slice());
  
  }
}