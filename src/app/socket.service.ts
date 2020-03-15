import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as io from 'socket.io-client';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/toPromise';

import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'https://chatapi.edwisor.com';
  private socket;

  constructor(public http: HttpClient) {
    this.socket = io(this.url);
   }

   public chatByUserId = (userId) => {
      return Observable.create((observer) => {
        this.socket.on(userId, (data) => {
          observer.next(data);
        });
      });
   }

  public verifyUser = () => {
    return Observable.create((observer) => {
      this.socket.on('verifyUser', (data) => {
        observer.next(data);
      });
    });
  }

  public onlineUserList = () => {
    return Observable.create((observer) =>{
      this.socket.on('online-user-list', (userList) => {
        observer.next(userList);
      })
    })
  }

  public disconnectedSocket = () => {
    return Observable.create((observer) => {
      this.socket.on("disconnect", () =>{
        observer.next();
      });
    });
  }

  public setUser = (authToken) => {
    this.socket.emit("set-user", authToken);
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';

    if(err.error instanceof Error) {

      errorMessage = `An error occurred!: ${err.error.message}`;
    }else {
      errorMessage = `server returned code: ${err.status}, error message is: ${err.message}`;

    }

    console.error(errorMessage);
    return Observable.throw(errorMessage);

  }

  public sendChatMessage = (chatMsgObject) => {

    this.socket.emit('chat-msg', chatMsgObject);

  }

  public getChat(senderId, receiverId, skip): Observable<any> {

    return this.http.get(`${this.url}/api/v1/chat/get/for.user?senderId=${senderId}&receiverId=${receiverId}&skip=${skip}&authToken=${Cookie.get('authtoken')}`)
      .pipe(tap(data => console.log('Data Received')))
      .pipe(catchError(this.handleError));

  }

  public markChatAsSeen = (userDetails) => {

    this.socket.emit('mark-chat-as-seen', userDetails);

  }

  public exitSocket = () => {

    this.socket.disconnect();

  }


}

