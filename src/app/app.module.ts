import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import {Routes, RouterModule} from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { FormsModule } from '@angular/forms';
import { ContactItemComponent } from './contacts/contact-item/contact-item.component';
import { DocumentsComponent } from './documents/documents.component';
import { DocumentListComponent } from './documents/document-list/document-list.component';
import { DocumentItemComponent } from './documents/document-item/document-item.component';
import { DocumentDetailComponent } from './documents/document-detail/document-detail.component';
import { MessageItemComponent } from './messages/message-item/message-item.component';
import { MessageEditComponent } from './messages/message-edit/message-edit.component';
import { MessageListComponent } from './messages/message-list/message-list.component';
import { DropdownDirectiveDirective } from './dropdown-directive.directive';
import { DocumentEditComponent } from './documents/document-edit/document-edit.component';
import { ContactEditComponent } from './contacts/contact-edit/contact-edit.component';
import { DndModule } from 'ng2-dnd';

// const appRoutes: Routes = [
//   {path: '', component:DocumentsComponent},
//   {path: 'contacts', component:ContactsComponent, },
//     // children:[
//     //   {
//     //     path:'new',
//     //     component:DocumentItemComponent
//     //   },
//     //   {
//     //     path:':id',
//     //     component:DocumentDetailComponent
//     //   },{
//     //     path:'id/edit', 
//     //     component:DocumentEditComponent
//     //   }]},
//   {path: 'messages', component:MessageItemComponent},
// ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactsComponent,
    ContactListComponent,
    ContactDetailComponent,
    ContactItemComponent,
    DocumentsComponent,
    DocumentListComponent,
    DocumentItemComponent,
    DocumentDetailComponent,
    MessageItemComponent,
    MessageEditComponent,
    MessageListComponent,
    DropdownDirectiveDirective,
    DocumentEditComponent,
    ContactEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    DndModule.forRoot(),
    // routing
     
  ],
  // getContacts():[],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
