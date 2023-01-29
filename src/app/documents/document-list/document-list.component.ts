import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent= new EventEmitter();
  documents = [
    new Document('1', 'CIT 260 -', 'Object Oriented Programming', 'https://www.example.com/1'),
    new Document('2', 'CIT 366 -', 'Full Web Stack Developer', 'https://www.example.com/2'),
    new Document('3', 'CIT 425 -', 'Data Warehousing', 'https://www.example.com/3'),
    new Document('4', 'CIT 460 -', 'Enterprise Development', 'https://www.example.com/4'),
    new Document('5', 'CIT 495 -', 'Senior Practicum', 'https://www.example.com/5')
  ];

  constructor() {}

  @Output() selectedContactEvent = new EventEmitter<Document>();
  
  ngOnInit(): void {}

  onSelectedDocument(document:Document){
    this.selectedDocumentEvent.emit(document);
  }
}