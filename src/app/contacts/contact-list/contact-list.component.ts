import { Component, EventEmitter,Output, OnInit  } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})


export class ContactListComponent implements OnInit{
  contacts: Contact[]=[];//to inject the data

  constructor(private contactService: ContactService){}
//constructor for the service  
  ngOnInit(): void{
    this.contacts = this.contactService.getContacts();
  }
  
  // @Output() selectedContactEvent = new EventEmitter<Contact>();
  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
}
