import {Component, Input, OnInit } from '@angular/core'
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {
  @Input() contact!:Contact;
  // @Input() contact = {name:'', imageUrl:''}
  
  constructor(){}
  ngOnInit(): void{}
  
  
  
  }
