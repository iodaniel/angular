import { Component, Input, OnInit} from '@angular/core';
import { Message } from '../message.model';
@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent {
// @Input() message = {sender:'', msgText:'' }
@Input() message!:Message;
  constructor(){}

  ngOnInit(): void {}
}
