import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
@Output() selectedDocumentEvent= new EventEmitter();
subscription!: Subscription
documents: Document[]=[];

  
  // documents = [
  //   new Document('1', 'CIT 260 -', 'Object Oriented Programming', 'https://www.example.com/1'),
  //   new Document('2', 'CIT 366 -', 'Full Web Stack Developer', 'https://www.example.com/2'),
  //   new Document('3', 'CIT 425 -', 'Data Warehousing', 'https://www.example.com/3'),
  //   new Document('4', 'CIT 460 -', 'Enterprise Development', 'https://www.example.com/4'),
  //   new Document('5', 'CIT 495 -', 'Senior Practicum', 'https://www.example.com/5')
  // ];

  constructor(private documentService: DocumentService) {}


  // @Output() selectedContactEvent = new EventEmitter<Document>();
  
  ngOnInit(): void {
   //this.documents = this.documentService.getDocuments();
   this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe( 
      (documents: Document[]) => {
      this.documents = documents;
      }
        );
      }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
    

    //selectedDocumentEvent.emit(document);
  
}