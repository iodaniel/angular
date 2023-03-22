import { Component , OnInit} from '@angular/core';
import { Message } from '../message.model';
import { MessagesService} from '../messages.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit{
  messages: Message[]=[];

  // messages: Message[] = [
  //   new Message('1', 'Test 1', 'This is the first test.', 'Daniel Ma'),
  //   new Message('2', 'Test 2', 'This is the second test.', 'David Marz'),
  //   new Message('3', 'Test 3', 'This is the third test.', 'Monice Marz' )
  // ];
  //injection of messageService
constructor(private messagesService: MessagesService){};
//add the services 
ngOnInit(): void {
  this.messagesService.getMessages();
  this.messagesService.messageChangedEvent.subscribe((messages:Message[])=>{
    this.messages = messages;
  })
}
//
//onSelected(message: Message){
  //this.messagesService.messageChangedEvent.emit(message);

   onAddMessage(message: Message){
     this.messages.push(message);
  }
}

