import { Component, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Message } from '../message.model';
import {MessagesService} from '../messages.service';

@Component({
  selector: 'app-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})

export class MessageEditComponent implements OnInit {
// @Output() addMessageEvent = new EventEmitter<Message>();
  @ViewChild('subject')subject!: ElementRef;
  @ViewChild('msgText')msgText!: ElementRef;
// currentSender: string = 'Anonimous Sender';
constructor(private messageService: MessagesService) {}

ngOnInit(): void {}

onSendMessage(){
  const subject = this.subject.nativeElement.value;
  const msgText = this.msgText.nativeElement.value;
  const message = new Message('1', subject, msgText, '5');
  this.messageService.addMessage(message);
}
// addMessage(){
//   const subject = this.subject.nativeElement.value;
//   const msgText = this.msgText.nativeElement.value;
//   const message = new Message('1', subject, msgText, '5');
//   this.messageService.addMessage(message);
// }

onClear() {
  this.subject.nativeElement.value = '';
  this.msgText.nativeElement.value = '';
}
}
