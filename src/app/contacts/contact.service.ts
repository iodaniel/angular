import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  contacts: Contact[]=[];
  maxContactId: number;

  constructor() {
    this.maxContactId =this.getMaxId()
    this.contacts = MOCKCONTACTS;
  }

  getContacts():Contact[] {
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
deleteContact(contact: Contact) {
  if (!contact) return;
  const pos = this.contacts.indexOf(contact);
  if (pos < 0) return;
  this.contacts.splice(pos, 1);
  this.contactListChangedEvent.next(this.contacts.slice());
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
  this.contactListChangedEvent.next(this.contacts.slice())
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
this.contactListChangedEvent.next(this.contacts.slice());
  
  }
}