import { Component} from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent{
  //object to sel!ect contact 
  selectedContact!: Contact;

}
