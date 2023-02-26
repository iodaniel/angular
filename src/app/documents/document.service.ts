import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
import {MOCKDOCUMENTS } from './MOCKDOCUMENTS'

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  documents : Document[]=[];
  maxDocumentId: number;
  

  constructor() {  
    this.maxDocumentId = this.getMaxId();
    this.documents = MOCKDOCUMENTS; }


  getDocuments():Document[]{
    return this.documents.slice();
      }

  getDocument(id:string):Document{
      for(const document of this.documents){
        if(document.id===id){
          return document;
          }
        }
        return null!;
      }
  deleteDocument(document: Document) {
        if (!document)return;
        const pos = this.documents.indexOf(document);
        if (pos < 0) return;
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
     }
  
getMaxId(): number {
  let maxId = 0;

  for (const document of this.documents) {
    const currentId = +document.id;
    if (currentId > maxId) {
      maxId = currentId;
    }
  }
  return maxId;
       
}

  addDocument(newDoc: Document){
    if (newDoc === null || newDoc === undefined) return;
    this.maxDocumentId++;
    newDoc.id = `${this.maxDocumentId}`;
    this.documents.push(newDoc);
    this.documentListChangedEvent.next(this.documents.slice())
  }

  updateDocument(original: Document, newDoc: Document){
    if (original === null || original === undefined ||
      newDoc===null || newDoc.id === undefined)
      {
        return;
      }
  const pos = this.documents.indexOf(original);
  if (pos < 0) return;

  newDoc.id = original.id;
  this.documents[pos] = newDoc;
  this.documentListChangedEvent.next(this.documents.slice());
  }
}
