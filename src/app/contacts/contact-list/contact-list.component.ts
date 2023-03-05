import { Component, EventEmitter,Output, OnInit, OnDestroy  } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})


export class ContactListComponent implements OnInit{
  contacts: Contact[]=[];//to inject the data
  subscription!: Subscription;
  term:string = '';

  constructor(private contactService: ContactService){}
//constructor for the service  
  ngOnInit(): void{
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
      this.contacts = contacts;
    });
  
  }
  ndOnDestroy(): void{
    this.subscription.unsubscribe();
  }
  search(value: string){
    this.term= value;
  }
  // @Output() selectedContactEvent = new EventEmitter<Contact>();

}
