import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Document } from './document.model';
// import {MOCKDOCUMENTS } from './MOCKDOCUMENTS'
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();
  
  private documentUrl = 'https://cmsproject-1eac7-default-rtdb.firebaseio.com/documents.json';
  private documents : Document[]=[];
  maxDocumentId: number;
  
  constructor(private http: HttpClient) {  
    this.getDocuments();
    
    this.maxDocumentId = this.getMaxId();
    // this.documents = MOCKDOCUMENTS; 
  
  }
  
  getDocuments(): Document[] {
    this.http
      .get<Document[]>(this.documentUrl)
      .subscribe((docs: Document[]) => {
        this.documents = docs;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => {
          if (a < b) return -1;
          if (a > b) return 1;
          return 0;
        });
        this.documentListChangedEvent.next(this.documents.slice());
      });

    return this.documents.slice();
  }

  storeDocuments() {
  
    let documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(this.documentUrl, documents, { headers: headers })
      .subscribe(
        () => {
          this.documentListChangedEvent.next(this.documents.slice());
        }
      )
  }

  getDocument(id:string):Document{
      for(const document of this.documents){
        if(document.id===id){
          return document;
          }
        }
        return null!;
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
    this.storeDocuments();
    //this.documentListChangedEvent.next(this.documents.slice())
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
  this.storeDocuments();
  //this.documentListChangedEvent.next(this.documents.slice());
  }

  deleteDocument(document: Document) {
    if (!document)return;
    const pos = this.documents.indexOf(document);
    if (pos < 0) return;
    this.documents.splice(pos, 1);
    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice());
 }
}
