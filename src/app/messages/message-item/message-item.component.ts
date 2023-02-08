import { Component, Input, OnInit} from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from 'src/app/contacts/contact.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
// @Input() message = {sender:'', msgText:'' }
@Input() message!:Message;
 //9.b
  messageSender: string= "";
  constructor(private contactService: ContactService){}
  
  ngOnInit() {
    this.messageSender = this.contactService.getContact(
      this.message.sender
    ).name;
    // const contact: Contact = this.contactService.getContact(this.message.sender);
    // this.messageSender = contact.name;
 }
  // ngOnInit(): void {
  //   this.messageSender = this.contactService.getContact(
  //     this.message.sender).name;

  // }
}
