import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users:User[];
  readonly baseURL = 'http://localhost:3009/user'
  constructor(private http: HttpClient) { }


  getUserList() {
    return this.http.get(this.baseURL);
  }

  postUser(user: User){
    return this.http.post(this.baseURL, user);
  }
}
