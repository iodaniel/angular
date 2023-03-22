import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './message.model';
// import { MOCKMESSAGES } from './MOCKMESSAGES'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  messageChangedEvent  = new EventEmitter<Message[]>();
//step 3 
  //private messageUrl = 'https://cmsproject-1eac7-default-rtdb.firebaseio.com/messages.json';
  private messageUrl = 'http://localhost:3000/messages'
  private messages: Message[] = [];
  private maxMessageId: number;


  constructor(private http: HttpClient) {
     this.maxMessageId = this.getMaxId();
  }
  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
    this.messageChangedEvent.next(this.messages.slice());
  }
  getMessages(){
    this.http.get<{ message: string; messageObjs: Message[]}>(this.messageUrl)
    .subscribe({
      next: (res) => {
        console.log(res.message);
        console.log(res.messageObjs);
        this.messages =res.messageObjs;
        this.sortAndSend();
      },
      error: (err)=>{
        console.error(err.message);
        console.error(err.error);
      }
    })
  }

  addMessage(newMsg: Message) {
    if (!newMsg) return;
    newMsg.id = '';
    this.http
      .post<{ message: string; messageObj: Message }>(
        this.messageUrl,
        newMsg,
        { headers: new HttpHeaders().set('Content-Type', 'application/json') }
      )
      .subscribe({
        next: (res) => {
          console.log(res.message);
          this.messages.push(res.messageObj);
          this.sortAndSend();
        },
        error: (err) => {
          console.error(err.message);
          console.error(err.error);
        },
      });
  }
storeMessages() {
  let messages = JSON.stringify(this.messages);
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  this.http.put(this.messageUrl, messages, { headers: headers })
    .subscribe(
      () => {
        
        this.messageChangedEvent.next(this.messages.slice());
      }
    )
}
  getMessage(id:string):Message{
    for (const message of this.messages){
      if(message.id===id){
        return message;
      }
    }
    return null!;
  }

  getMaxId(): number {
    let maxId = 0;
  
    for (const message of this.messages) {
      const currentId = +message.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
         
  }
// addMessage(message: Message){
//     if (message === null || message === undefined) return;
//     this.maxMessageId++;
//     message.id = `${this.maxMessageId}`;
//     this.messages.push(message);
//     this.storeMessages();
//   }

}
