import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit{
  original! :Document;
  document! : Document;
  editMode: boolean= false;

  constructor(
    private docService : DocumentService, 
    private router: Router,
    private route: ActivatedRoute
  ){
    
  }
  ngOnInit(): void{
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id === undefined || id === null || !id) {
        this.editMode = false;
        return;
      }
      this.original = this.docService.getDocument(id);
      if (
        this.original === undefined ||
        this.original === null
      ) {
        return;
      }
      this.editMode = true;
      this.document = JSON.parse(JSON.stringify(this.original));
    });
  }


  onSubmit(form: NgForm){
    
    const values = form.value;
    const newDoc = new Document(values.id, values.name, values.description, values.url) // assuming we use id as document identifier
   
    if (this.editMode===true) {
      this.docService.updateDocument(this.original, newDoc);
    } else {
      this.docService.addDocument(newDoc);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route});
  }

}
