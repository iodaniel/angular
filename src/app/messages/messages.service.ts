import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES'

@Injectable({
  providedIn: 'root'
})
//==============start the exportation of class============
export class MessagesService {
  messageChangedEvent  = new EventEmitter<Message[]>();
//step 3 
  messages: Message[] = [];

  constructor() { this.messages = MOCKMESSAGES;}

  getMessages(): Message[]{
    return this.messages.slice();
  }
//server getMessage Loop,If statement
  getMessage(id:string):Message{
    for (const message of this.messages){
      if(message.id===id){
        return message;
      }
    }
    return null!;
  }

addMessage(message: Message){
  this.messages.push(message);
  this.messageChangedEvent.emit(this.messages.slice());
  }
}

